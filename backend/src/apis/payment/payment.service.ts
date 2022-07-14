import { ConflictException, Injectable, UnprocessableEntityException } from '@nestjs/common';
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

    async create({ userId, reservationId, createPaymentInput }) {
        const { impUid } = createPaymentInput;
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();

        // 중복 결제 방지
        const impAccessToken = (await this.iamportService.getToken()).data.response;

        if (!impAccessToken) throw new UnprocessableEntityException();

        const paymentData = await (await this.iamportService.getPaymentData({ impUid, impAccessToken })).data.response;

        const hasPaymentData = await this.paymentRepository.findOne({ imp_uid: paymentData.imp_uid });

        if (hasPaymentData) throw new ConflictException('같은 결제건이 있습니다!!');

        // 결제 시작
        await queryRunner.startTransaction('SERIALIZABLE');

        try {
            const payment = this.paymentRepository.create({
                imp_uid: impUid,
                merchant_uid: paymentData.imp_uid,
                price: createPaymentInput.price,
                usepoint: createPaymentInput.usepoint,
                user: userId,
                reservation: reservationId,
            });

            await queryRunner.manager.save(payment);

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
                { id: reservationId },
                { status: '결제완료' },
            );

            await queryRunner.commitTransaction();

            // return await queryRunner.manager.findOne(Payment, {
            //     where: { id: result.id },
            //     relations: ['user', 'reservation'],
            // });
            return true;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new ConflictException(error, '결제 실패!!');
        } finally {
            await queryRunner.release();
        }
    }

    async cancel({ reservationId, userId, merchantUid }) {
        const queryRunner = await this.connection.createQueryRunner();
        await queryRunner.connect();

        const reservationInfo = await this.reservationRepository.findOne({ id: reservationId });
        if (reservationInfo.status === '환불완료') throw new UnprocessableEntityException('이미 환불된 예약입니다!!');

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

        await queryRunner.startTransaction();

        try {
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
