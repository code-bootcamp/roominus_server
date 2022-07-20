import { InputType, PartialType } from '@nestjs/graphql';
import { CreateBoardreviewInput } from './createBoardreview.input';

@InputType()
export class UpdateBoardReviewInput extends PartialType(CreateBoardreviewInput) {}
