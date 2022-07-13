import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateThemeReviewInput {
    @Field(() => Boolean, { nullable: true })
    clear: boolean;

    @Field(() => String, { nullable: true })
    rank: string;

    @Field(() => Int, { nullable: true })
    star: number;

    @Field(() => String, { nullable: true })
    content: string;
}
