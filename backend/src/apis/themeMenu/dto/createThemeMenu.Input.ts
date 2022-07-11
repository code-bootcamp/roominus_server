import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateThemeMenuInput {
    @Field(() => Int)
    people_number: number;

    @Field(() => Int)
    price: number;

    @Field(() => String)
    cafeName: string;

    @Field(() => String)
    themeTitle: string;
}
