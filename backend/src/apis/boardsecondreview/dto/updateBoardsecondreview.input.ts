import { InputType, PartialType } from '@nestjs/graphql';
import { CreateBoardsecondreviewInput } from './createBoardsecondreview.input';

@InputType()
export class UpdateBoardSecondReviewInput extends PartialType(CreateBoardsecondreviewInput) {}
