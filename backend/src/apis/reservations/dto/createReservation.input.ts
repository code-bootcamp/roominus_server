import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateReservationInput {
    @Field(() => String)
    reservation_date: string;

    @Field(() => String, { nullable: true })
    memo: string;

    // 테이블에 없는 속성, 최대 인원 수를 넘기는 지 확인용
    @Field(() => Int)
    people_number: number;
}
