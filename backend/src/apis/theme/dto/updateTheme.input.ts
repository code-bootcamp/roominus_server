import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateThemeInput {
    @Field(() => String, { nullable: true })
    title: string;

    @Field(() => Int, { nullable: true })
    rank: number;

    @Field(() => String, { nullable: true })
    intro_title: string;

    @Field(() => String, { nullable: true })
    intro_content: string;

    @Field(() => Int, { nullable: true })
    agelimit: number;

    @Field(() => String, { nullable: true })
    mainImg: string;

    // @Field(() => [String], { nullable: true })
    // subImgs: string;
}
