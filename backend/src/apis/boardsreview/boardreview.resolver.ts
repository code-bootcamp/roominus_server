import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { async } from 'rxjs';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';
import { BoardreviewService } from './boardreview.service';
import { CreateBoardreviewInput } from './dto/createBoardreview.input';
import { UpdateBoardReviewInput } from './dto/updateBoardreview.input';
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
    fetchBoardReviewComments(
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

    @Mutation(() => Boardreview)
    async updateBoardreview(
        @Args('boardreviewId') boardreviewId: string,
        @Args('updateBoardreviewInput') updateBoardreviewInput: UpdateBoardReviewInput, //
    ) {
        return await this.boardreviewService.update({ boardreviewId, updateBoardreviewInput });
    }

    @Mutation(() => Boolean)
    deleteBoardreview(
        @Args('id') id: string, //
    ) {
        return this.boardreviewService.delete({ id });
    }
}
