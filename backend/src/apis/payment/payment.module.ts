import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { IamportModule } from '../iamport/iamport.module';

import { PaymentResolver } from './payment.resolver';
import { PaymentService } from './payment.service';

import { Reservation } from '../reservations/entities/reservation.entity';
import { Payment } from './entities/payment.entity';
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
