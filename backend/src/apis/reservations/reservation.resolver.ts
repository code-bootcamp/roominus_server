import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { PaymentService } from '../payment/payment.service';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';

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
    async fetchReservations(
        @Args('cafeId') cafeId: string, //
        @Args('reservationDate') reservationDate: string,
    ) {
        return await this.reservationService.findAll({ cafeId, reservationDate });
    }

    @Query(() => Reservation)
    async fetchReservation(
        @Args('reservationId') reservationId: string, //
    ) {
        return await this.reservationService.findOne({ reservationId });
    }

    @Query(() => [Reservation])
    fetchReservationsUser(
        @Args('userId') userId: string, //
    ) {
        return this.reservationService.findwithUser({ userId });
    }

    // 트랜젝션
    @UseGuards(GqlAuthAccessGuard)
    @Mutation(() => Reservation)
    async createReservation(
        @Args('cafeId') cafeId: string, //
        @Args('themeMenuId') themeMenuId: string,
        @Args('createReservationInput') createReservationInput: CreateReservationInput,
        @Args('createPaymentInput') createPaymentInput: CreatePaymentInput,
        @CurrentUser('userInfo') userInfo: ICurrentUser,
    ) {
        return await this.reservationService.create({
            cafeId,
            themeMenuId,
            createReservationInput,
            createPaymentInput,
            userId: userInfo.id,
            // userId: '8acc2ac3-24a1-469f-a2a4-6b267bb51f09',
            // userId: '5a78a9a6-633a-4ba9-871f-9a74c9fd2970',
        });
    }

    // 트랜젝션
    @UseGuards(GqlAuthAccessGuard)
    @Mutation(() => Boolean)
    async deleteReservation(
        @Args('reservationId') reservationId: string, //
        @Args('merchantUid') merchantUid: string,
        @CurrentUser('userInfo') userInfo: ICurrentUser,
    ) {
        const resultCancelPayment = this.paymentService.cancel({
            reservationId, //
            merchantUid,
            userId: userInfo.id,
            // userId: '8acc2ac3-24a1-469f-a2a4-6b267bb51f09',
            // userId: '5a78a9a6-633a-4ba9-871f-9a74c9fd2970',
        });

        if (resultCancelPayment) return true;
    }
}
