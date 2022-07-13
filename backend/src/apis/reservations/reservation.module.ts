import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PaymentModule } from '../payment/payment.module';

import { ReservationResolver } from './reservation.resolver';
import { ReservationService } from './reservation.service';

import { Reservation } from './entities/reservation.entity';
import { ThemeMenu } from '../themeMenu/entities/themeMenu.entity';
import { User } from '../user/entities/user.entity';
import { Cafe } from '../cafe/entities/cafe.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Reservation, Cafe, User, ThemeMenu]), //
        PaymentModule,
    ],
    providers: [ReservationResolver, ReservationService],
})
export class ReservationModule {}
