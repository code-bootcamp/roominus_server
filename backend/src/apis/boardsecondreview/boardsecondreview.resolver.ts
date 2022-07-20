import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { userInfo } from 'os';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';
import { BoardsecondreviewService } from './boardsecondreview.service';
import { CreateBoardsecondreviewInput } from './dto/createBoardsecondreview.input';
import { Boardsecondreview } from './entities/boardsecondreview.entity';

@Resolver()
export class BoardsecondreviewResolver {
    constructor(
        private readonly boardsecondreviewService: BoardsecondreviewService, //
    ) {}

    @Query(() => Boardsecondreview)
    async fetchBoardsecondreview(@Args('id') id: string) {
        return this.boardsecondreviewService.findOne({ id });
    }
    @UseGuards(GqlAuthAccessGuard)
    @Mutation(() => Boardsecondreview)
    async createBoardsecondreview(
        @CurrentUser('userInfo') userInfo: ICurrentUser, //
        @Args('createBoardsecondreviewInput') createBoardsecondreviewInput: CreateBoardsecondreviewInput,
    ) {
        return await this.boardsecondreviewService.create({ userInfo, createBoardsecondreviewInput });
    }

    @UseGuards(GqlAuthAccessGuard)
    @Mutation(() => Boolean)
    deleteBoardsecondreview(
        @Args('secondReviewId') secondReviewId: string,
        @CurrentUser('userInfo') userInfo: ICurrentUser, //
    ) {
        return this.boardsecondreviewService.delete({ secondReviewId, userInfo });
    }
}
