import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateThemeReviewInput {
    @Field(() => Boolean)
    clear: boolean;

    @Field(() => String)
    rank: string;

    @Field(() => Int)
    star: number;

    @Field(() => String)
    content: string;
}
