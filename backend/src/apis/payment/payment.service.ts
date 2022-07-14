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
}
