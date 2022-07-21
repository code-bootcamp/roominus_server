import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBoardsecondreviewInput {
    @Field(() => String)
    content: string;
}
