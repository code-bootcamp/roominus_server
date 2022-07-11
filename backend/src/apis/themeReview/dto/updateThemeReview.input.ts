import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateThemeReviewInput {
    @Field(() => Boolean, { nullable: true })
    clear: boolean;

    @Field(() => String, { nullable: true })
    rank: string;

    @Field(() => String, { nullable: true })
    content: string;
}
