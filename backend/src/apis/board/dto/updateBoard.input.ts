import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateBoardInput {
    ///
    @Field(() => String)
    title: string;

    @Field(() => String)
    content: string;

    @Field(() => Int, { nullable: true })
    like: number;

    @Field(() => Int, { nullable: true })
    view: number;
}
