import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';

import { PaymentService } from './payment.service';

import { Payment } from './entities/payment.entity';

@Resolver()
export class PaymentResolver {
    constructor(
        private readonly paymentService: PaymentService, //
    ) {}

    @UseGuards(GqlAuthAccessGuard)
    @Query(() => [Payment])
    fetchPayments(
        @Args('page') page: number,
        @CurrentUser('userInfo') userInfo: ICurrentUser, //
    ) {
        return this.paymentService.find({ userInfo, page });
    }

    @UseGuards(GqlAuthAccessGuard)
    @Query(() => Int)
    fetchPaymentsCount(
        @CurrentUser('userInfo') userInfo: ICurrentUser, //
    ) {
        return this.paymentService.findCount({ userInfo });
    }
}
