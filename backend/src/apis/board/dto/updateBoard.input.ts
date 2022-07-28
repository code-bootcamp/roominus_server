import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateBoardInput } from './createBoard.input';

@InputType()
export class UpdateBoardInput extends PartialType(CreateBoardInput) {}

// export class UpdateBoardInput {

//     @Field(() => String)
//     title: string;

//     @Field(() => String)
//     content: string;

//     @Field(() => Int, { nullable: true })
//     like: number;

//     @Field(() => Int, { nullable: true })
//     view: number;
// }
