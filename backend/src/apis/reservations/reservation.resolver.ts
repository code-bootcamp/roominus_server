import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { PaymentService } from '../payment/payment.service';

import { ReservationService } from './reservation.service';
import { CreateReservationInput } from './dto/createReservation.input';
import { CreatePaymentInput } from '../payment/dto/createPayment.input';

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

    @Query(() => [Reservation])
    fetchReservationsUser(
        @Args('userId') userId: string, //
    ) {
        return this.reservationService.findwithUser({ userId });
    }

    // 트랜젝션
    @Mutation(() => Reservation)
    async createReservation(
        @Args('cafeId') cafeId: string, //
        // @Args('userId') userId: string, // 토큰이 잘 되면 토큰에 있는 사용자 정보로 대체
        @Args('themeMenuId') themeMenuId: string,
        @Args('createReservationInput') createReservationInput: CreateReservationInput,
        @Args('createPaymentInput') createPaymentInput: CreatePaymentInput,
    ) {
        return await this.reservationService.create({
            cafeId,
            userId: '8acc2ac3-24a1-469f-a2a4-6b267bb51f09',
            // userId: '5a78a9a6-633a-4ba9-871f-9a74c9fd2970',
            themeMenuId,
            createReservationInput,
            createPaymentInput,
        });
    }

    // 트랜젝션
    @Mutation(() => Reservation)
    updateReservation() {}

    // 트랜젝션
    @Mutation(() => Boolean)
    async deleteReservation(
        @Args('reservationId') reservationId: string,
        // @Args('userId') userId: string,
        @Args('merchantUid') merchantUid: string,
    ) {
        const resultCancelPayment = this.paymentService.cancel({
            reservationId, //
            userId: '8acc2ac3-24a1-469f-a2a4-6b267bb51f09',
            // userId: '5a78a9a6-633a-4ba9-871f-9a74c9fd2970',
            merchantUid,
        });

        if (resultCancelPayment) return true;
    }
}
