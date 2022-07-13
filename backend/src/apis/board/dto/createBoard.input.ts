import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateBoardInput {
    ///

    @Field(() => String, { nullable: true })
    title: string;

    @Field(() => String, { nullable: true })
    content: string;

    @Field(() => Int, { nullable: true })
    like: number;

    @Field(() => Int, { nullable: true })
    view: number;

    @Field(() => [String], { nullable: true })
    boardTags: string[];
}
