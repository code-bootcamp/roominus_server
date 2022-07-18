import { Args, Query, Resolver } from '@nestjs/graphql';

import { PaymentService } from './payment.service';

import { Payment } from './entities/payment.entity';

@Resolver()
export class PaymentResolver {
    constructor(
        private readonly paymentService: PaymentService, //
    ) {}

    @Query(() => [Payment])
    fetchPayments(
        @Args('userId') userId: string, //
    ) {
        return this.paymentService.find({ userId });
    }
}
