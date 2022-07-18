import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { IamportService } from '../iamport/iamport.service';

import { Reservation } from '../reservations/entities/reservation.entity';
import { User } from '../user/entities/user.entity';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Payment)
        private readonly paymentRepository: Repository<Payment>,
        @InjectRepository(Reservation)
        private readonly reservationRepository: Repository<Reservation>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly iamportService: IamportService,
        private readonly connection: Connection,
    ) {}

    async find({ userId }) {
        const result = this.paymentRepository.find({
            where: { user: userId },
            relations: ['user', 'reservation'],
        });

        if (!result) throw new UnprocessableEntityException('결제 기록이 없습니다!!');
        return result;
    }

    async cancel({ reservationId, userId, merchantUid }) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();

        // const reservationInfo = await this.reservationRepository.findOne({ id: reservationId });
        // if (reservationInfo.status === '환불완료') throw new UnprocessableEntityException('이미 환불된 예약입니다!!');

        // const impAccessToken = (await this.iamportService.getToken()).data.response.access_token;
        // if (!impAccessToken) throw new UnprocessableEntityException('엑세스 토큰 수령 실패!!');

        // const payments = await this.paymentRepository.find({
        //     where: { merchant_uid: merchantUid },
        //     order: { createdAt: 'DESC' },
        // });
        // const { imp_uid, merchant_uid, price, usepoint } = payments[0];

        // await this.iamportService.paymentCancel({
        //     impAccessToken,
        //     imp_uid,
        // });

        await queryRunner.startTransaction();

        try {
            const reservationInfo = await this.reservationRepository.findOne({ id: reservationId });
            if (reservationInfo.status === '환불완료')
                throw new UnprocessableEntityException('이미 환불된 예약입니다!!');

            const impAccessToken = (await this.iamportService.getToken()).data.response.access_token;
            if (!impAccessToken) throw new UnprocessableEntityException('엑세스 토큰 수령 실패!!');

            const payments = await this.paymentRepository.find({
                where: { merchant_uid: merchantUid },
                order: { createdAt: 'DESC' },
            });

            const { imp_uid, merchant_uid, price, usepoint } = payments[0];

            await this.iamportService.paymentCancel({
                impAccessToken,
                imp_uid,
            });

            const newPayment = this.paymentRepository.create({
                imp_uid,
                merchant_uid,
                price: -price,
                usepoint: -usepoint,
                user: userId,
                reservation: reservationId,
            });

            queryRunner.manager.update(
                Reservation, //
                { id: reservationId },
                { status: '환불완료' },
            );

            const userInfo = await this.userRepository.findOne({ id: userId });
            queryRunner.manager.update(
                User, //
                { id: userId },
                { point: userInfo.point - price * 0.03 },
            );

            queryRunner.manager.save(newPayment);

            await queryRunner.commitTransaction();

            return true;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new UnprocessableEntityException(error, '환불 실패!!');
        } finally {
            await queryRunner.release();
        }
    }
}
