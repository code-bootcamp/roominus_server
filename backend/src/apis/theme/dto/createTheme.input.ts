import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateThemeInput {
    @Field(() => String)
    title: string;

    @Field(() => Int)
    rank: number;

    @Field(() => String, { nullable: true })
    intro_title: string;

    @Field(() => String, { nullable: true })
    intro_content: string;

    @Field(() => Int)
    agelimit: number;

    @Field(() => Int)
    peoplelimit: number;

    @Field(() => String)
    clearTime: string;

    @Field(() => String)
    mainImg: string;

    @Field(() => [String, { nullable: true }])
    subImgs: string;
}
