import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateThemeMenuInput {
    @Field(() => String)
    reservation_time: string;

    @Field(() => Int)
    people_number: number;

    @Field(() => Int)
    price: number;

    @Field(() => String)
    cafeName: string;

    @Field(() => String)
    themeTitle: string;
}
