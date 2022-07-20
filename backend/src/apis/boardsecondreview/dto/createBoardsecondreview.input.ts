import { Injectable } from '@nestjs/common';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBoardsecondreviewInput {
    @Field(() => String)
    content: string;

    @Field(() => String)
    boardreview: string;

    @Field(() => String)
    user: string;
}
