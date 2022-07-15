import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBoardreviewInput {
    @Field(() => String)
    content: string;

    @Field(() => String)
    board: string;
}
