import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateThemeReviewInput {
    @Field(() => String)
    writerName: string;

    @Field(() => Boolean)
    clear: boolean;

    @Field(() => String)
    rank: string;

    @Field(() => String)
    content: string;
}
