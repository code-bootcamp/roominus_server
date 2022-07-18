import { ConflictException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { IamportService } from '../iamport/iamport.service';

import { Payment } from '../payment/entities/payment.entity';
import { ThemeMenu } from '../themeMenu/entities/themeMenu.entity';
import { User } from '../user/entities/user.entity';
import { Reservation } from './entities/reservation.entity';
import { Cafe } from '../cafe/entities/cafe.entity';

@Injectable()
export class ReservationService {
    constructor(
        @InjectRepository(Reservation)
        private readonly reservationRepository: Repository<Reservation>,
        @InjectRepository(Cafe)
        private readonly cafeRepository: Repository<Cafe>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(ThemeMenu)
        private readonly themeMenuRepository: Repository<ThemeMenu>,
        @InjectRepository(Payment)
        private readonly paymentRepository: Repository<Payment>,
        private readonly iamportService: IamportService,
        private readonly connection: Connection,
    ) {}

    async findAll({ cafeId, reservationDate }) {
        const result = await this.reservationRepository.find({
            where: { cafe: cafeId, reservation_date: reservationDate },
            relations: ['cafe', 'user', 'theme_menu', 'payment'],
        });

        if (!result || result.length === 0) throw new UnprocessableEntityException('예약이 없습니다!!');

        return result;
    }

    async findwithUser({ userId }) {
        const result = this.reservationRepository.find({
            where: { user: userId },
            relations: ['cafe', 'user', 'theme_menu'],
            order: { createdAt: 'DESC' },
        });

        if (!result || (await result).length === 0) throw new UnprocessableEntityException('예약이 없습니다!!');

        return result;
    }

    async create({ cafeId, userId, themeMenuId, createReservationInput, createPaymentInput }) {
        const { people_number, ...reservation } = createReservationInput;
        const { impUid } = createPaymentInput;

        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();

        //인풋 값 유효성 확인
        const hasCafe = await this.cafeRepository.findOne({ id: cafeId });
        if (!hasCafe) throw new UnprocessableEntityException('예약 실패!! 등록되지 않은 카페입니다!!');

        const hasUser = await this.userRepository.findOne({ id: userId });
        if (!hasUser) throw new UnprocessableEntityException('예약 실패!! 등록되지 않은 사용자입니다!!');

        //마감된 예약 방지
        const hasThemeMenu = await this.themeMenuRepository.findOne({ id: themeMenuId });
        if (!hasThemeMenu)
            throw new UnprocessableEntityException('예약 실패!! 예약하시려는 테마에 열린시간이 없습니다!!');

        // 같은 사용자 중복 예약 방지
        const hasReservation = await this.reservationRepository
            .createQueryBuilder('reservation')
            .where('reservation.cafe = :cafe', { cafe: hasCafe.id })
            .andWhere('reservation.user = :user', { user: hasUser.id })
            .andWhere('reservation.theme_menu = :theme_menu', { theme_menu: hasThemeMenu.id })
            .getOne();
        if (hasReservation) throw new ConflictException({ hasReservation, description: '이미 예약하셨습니다!!' });

        // 중복 결제 방지
        const impAccessToken = (await this.iamportService.getToken()).data.response;
        if (!impAccessToken) throw new UnprocessableEntityException();

        const paymentData = await (await this.iamportService.getPaymentData({ impUid, impAccessToken })).data.response;
        const hasPaymentData = await this.paymentRepository.findOne({ imp_uid: paymentData.imp_uid });
        if (hasPaymentData) throw new ConflictException('같은 결제건이 있습니다!!');

        await queryRunner.startTransaction('SERIALIZABLE');

        try {
            //예약 등록
            const newReservationInput = this.reservationRepository.create({
                ...reservation,
                cafe: hasCafe.id,
                user: hasUser.id,
                theme_menu: hasThemeMenu.id,
            });
            const newReservation = await queryRunner.manager.save(newReservationInput);

            const resultReservation = await queryRunner.manager.findOne(Reservation, {
                where: { id: newReservation['id'] },
                relations: ['cafe', 'user', 'theme_menu'],
            });

            //결제 등록
            const payment = this.paymentRepository.create({
                imp_uid: impUid,
                merchant_uid: paymentData.imp_uid,
                price: createPaymentInput.price,
                usepoint: createPaymentInput.usepoint,
                user: userId,
                reservation: resultReservation.id,
            });
            const resultPayment = await queryRunner.manager.save(payment);

            // 사용자 포인트 추가
            const user = await queryRunner.manager.findOne(
                User,
                { id: userId },
                { lock: { mode: 'pessimistic_write' } },
            );
            await queryRunner.manager.update(
                User,
                { id: user.id },
                { point: user.point - createPaymentInput.usepoint + Math.ceil(createPaymentInput.price * 0.03) },
            );
            await queryRunner.manager.update(
                Reservation, //
                { id: resultReservation.id },
                { payment: resultPayment.id },
            );

            await queryRunner.commitTransaction();

            return await this.reservationRepository.findOne({
                where: { id: resultReservation.id },
                relations: ['cafe', 'user', 'theme_menu', 'payment'],
            });
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new ConflictException(error, '예약 실패!!');
        } finally {
            await queryRunner.release();
        }
    }

    update() {}

    delete() {}
}
