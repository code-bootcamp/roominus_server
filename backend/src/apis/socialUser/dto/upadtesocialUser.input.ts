import { InputType, PartialType } from '@nestjs/graphql';
import { CreateSocialUserInput } from './createsocialUser.input';

@InputType()
export class UpdateSocialUserInput extends PartialType(CreateSocialUserInput) {}
