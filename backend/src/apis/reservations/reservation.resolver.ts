import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { PaymentService } from '../payment/payment.service';

import { ReservationService } from './reservation.service';
import { CreateReservationInput } from './dto/createReservation.input';

import { Reservation } from './entities/reservation.entity';

@Resolver()
export class ReservationResolver {
    constructor(
        private readonly reservationService: ReservationService, //
        private readonly paymentService: PaymentService,
    ) {}

    @Query(() => [Reservation])
    fetchReservatoins(
        @Args('cafeId') cafeId: string, //
        @Args('reservationDate') reservationDate: string,
    ) {
        return this.reservationService.findAll({ cafeId, reservationDate });
    }

    // 트랜젝션
    @Mutation(() => Reservation)
    async createReservation(
        @Args('cafeId') cafeId: string, //
        @Args('userId') userId: string, // 토큰이 잘 되면 토큰에 있는 사용자 정보로 대체
        @Args('themeMenuId') themeMenuId: string,
        @Args('createReservationInput') createReservationInput: CreateReservationInput,
    ) {
        const resultReservation = await this.reservationService.create({
            cafeId,
            userId,
            themeMenuId,
            createReservationInput,
        });
    }

    // 트랜젝션
    @Mutation(() => Reservation)
    updateReservation() {}

    // 트랜젝션
    @Mutation(() => Boolean)
    deleteReservation() {}
}
