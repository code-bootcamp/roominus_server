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

    @UseGuards(GqlAuthAccessGuard)
    @Query(() => [Reservation])
    fetchReservationsUser(
        @CurrentUser('userInfo') userInfo: ICurrentUser, //
    ) {
        return this.reservationService.findwithUser({ userInfo });
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
        });

        if (resultCancelPayment) return true;
    }
}
