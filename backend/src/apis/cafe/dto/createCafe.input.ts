import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCafeInput {
    ///
    @Field(() => String)
    name: string;

    @Field(() => String)
    phone: string;

    @Field(() => String, { nullable: true })
    intro_content: string;

    @Field(() => String)
    address: string;

    @Field(() => String, { nullable: true })
    address_detail: string;

    @Field(() => Float)
    coordinate: number;

    @Field(() => String)
    img: string;
}
