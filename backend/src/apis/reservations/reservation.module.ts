import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { PaymentModule } from '../payment/payment.module';
import { IamportModule } from '../iamport/iamport.module';

import { ReservationResolver } from './reservation.resolver';
import { ReservationService } from './reservation.service';

import { ThemeMenu } from '../themeMenu/entities/themeMenu.entity';
import { Payment } from '../payment/entities/payment.entity';
import { Reservation } from './entities/reservation.entity';
import { User } from '../user/entities/user.entity';
import { Cafe } from '../cafe/entities/cafe.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Reservation, Cafe, User, ThemeMenu, Payment]), //
        PaymentModule,
        IamportModule,
    ],
    providers: [ReservationResolver, ReservationService],
})
export class ReservationModule {}
