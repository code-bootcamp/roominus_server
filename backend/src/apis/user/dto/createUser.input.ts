import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
    @Field(() => Boolean, { nullable: true })
    isserviceprovider: boolean;

    @Field(() => String)
    email: string;

    @Field(() => String)
    password: string;

    @Field(() => String)
    name: string;

    @Field(() => String)
    phone: string;

    @Field(() => Int, { nullable: true })
    point: number;

    @Field(() => String, { nullable: true })
    cafe: string;
}
