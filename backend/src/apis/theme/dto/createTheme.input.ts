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
}
