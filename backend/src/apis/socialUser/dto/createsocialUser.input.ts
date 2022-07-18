import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatesocialUserInput {
    @Field(() => String)
    email: string;

    @Field(() => String)
    phone: string;
}
