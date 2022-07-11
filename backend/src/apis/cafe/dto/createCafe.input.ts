import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCafeInput {
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

    @Field(() => Float, { nullable: true })
    coordinate: number;

    @Field(() => String)
    mainImg: string;

    @Field(() => [String], { nullable: true })
    subImgs: string[];

    @Field(() => [String])
    users: string[];
}
