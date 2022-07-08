import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateCafeInput {
    @Field(() => String)
    name: string;

    @Field(() => String, { nullable: true })
    phone: string;

    @Field(() => String, { nullable: true })
    intro_content: string;

    @Field(() => String, { nullable: true })
    address: string;

    @Field(() => String, { nullable: true })
    address_detail: string;

    @Field(() => Float, { nullable: true })
    coordinate: number;

    @Field(() => String, { nullable: true })
    mainImg: string;

    @Field(() => [String], { nullable: true })
    subImgs: string[];

    @Field(() => [String], { nullable: true })
    users: string[];
}
