import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreatePaymentInput {
    @Field(() => String)
    impUid: string;

    @Field(() => Int)
    price: number;

    @Field(() => Int)
    usepoint: number;
}
