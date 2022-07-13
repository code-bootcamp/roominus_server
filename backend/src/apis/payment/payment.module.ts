import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IamportModule } from '../iamport/iamport.module';

import { PaymentResolver } from './payment.resolver';
import { PaymentService } from './payment.service';

import { Payment } from './entities/payment.entity';
import { Reservation } from '../reservations/entities/reservation.entity';
import { User } from '../user/entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Payment, Reservation, User]), //
        IamportModule,
    ],
    providers: [PaymentResolver, PaymentService],
    exports: [PaymentService],
})
export class PaymentModule {}
