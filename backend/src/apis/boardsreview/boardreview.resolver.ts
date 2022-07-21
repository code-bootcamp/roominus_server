import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';

import { CreateBoardreviewInput } from './dto/createBoardreview.input';
import { UpdateBoardReviewInput } from './dto/updateBoardreview.input';
import { BoardreviewService } from './boardreview.service';

import { Boardreview } from './entities/boardreview.entity';

@Resolver()
export class BoardreviewResolver {
    constructor(
        private readonly boardreviewService: BoardreviewService, //
    ) {}

    @Query(() => Boardreview)
    async fetchBoardreview(@Args('id') id: string) {
        return this.boardreviewService.findOne({ id });
    }

    @Query(() => Boardreview)
    fetchReviewComments(
        // @Args('page') page: number, //
        @Args('boardreviewId') boardreviewId: string,
    ) {
        return this.boardreviewService.findboardreviewcomments({ boardreviewId });
    }

    @UseGuards(GqlAuthAccessGuard)
    @Mutation(() => Boardreview)
    async createBoardreview(
        @CurrentUser('userInfo') userInfo: ICurrentUser, //
        @Args('createBoardreviewInput') createBoardreviewInput: CreateBoardreviewInput, //
    ) {
        return await this.boardreviewService.create({ userInfo, createBoardreviewInput });
    }

    @UseGuards(GqlAuthAccessGuard)
    @Mutation(() => Boardreview)
    async updateBoardreview(
        @Args('boardReviewId') boardReviewId: string,
        @CurrentUser('userInfo') userInfo: ICurrentUser,
        @Args('updateBoardreviewInput') updateBoardreviewInput: UpdateBoardReviewInput, //
    ) {
        return await this.boardreviewService.update({ boardReviewId, updateBoardreviewInput, userInfo });
    }

    @UseGuards(GqlAuthAccessGuard)
    @Mutation(() => Boolean)
    deleteBoardreview(
        @Args('boardReviewId') boardReviewId: string, //
        @CurrentUser('userInfo') userInfo: ICurrentUser,
    ) {
        return this.boardreviewService.delete({ boardReviewId, userInfo });
    }
}
