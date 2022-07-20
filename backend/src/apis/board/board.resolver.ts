import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { userInfo } from 'os';

import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';

import { BoardService } from './board.service';
import { CreateBoardInput } from './dto/createBoard.input';
import { UpdateBoardInput } from './dto/updateBoard.input';

import { Board } from './entities/board.entity';

@Resolver()
export class BoardResolver {
    constructor(
        private readonly boardService: BoardService, //
    ) {}

    @Query(() => [Board])
    fetchBoards() {
        return this.boardService.findAll();
    }

    @Query(() => Board)
    fetchBoard(@Args('id') id: string) {
        return this.boardService.findOne({ id });
    }

    @Query(() => Board)
    fetchBoardComments(
        // @Args('page') page: number, //
        @Args('boardId') boardId: string,
    ) {
        return this.boardService.findboardcomments({ boardId });
    }

    @UseGuards(GqlAuthAccessGuard)
    @Query(() => [Board])
    async fetchBoardsUser(
        @Args('page', { defaultValue: 1 }) page: number,
        @CurrentUser('userInfo') userInfo: ICurrentUser, //
    ) {
        return await this.boardService.findwithUser({ userInfo, page });
    }

    @UseGuards(GqlAuthAccessGuard)
    @Query(() => Int)
    async fetchBoardsUserCount(
        @CurrentUser('userInfo') userInfo: ICurrentUser, //
    ) {
        return this.boardService.findUserCount({ userInfo });
    }

    @UseGuards(GqlAuthAccessGuard)
    @Mutation(() => Board)
    async createBoard(
        @CurrentUser('userInfo') userInfo: ICurrentUser,
        @Args('createBoardInput') createBoardInput: CreateBoardInput, //
    ) {
        return this.boardService.create({ userInfo, createBoardInput });
    }

    @UseGuards(GqlAuthAccessGuard)
    @Mutation(() => Board)
    async updateBoard(
        @CurrentUser('userInfo') userInfo: ICurrentUser,
        @Args('boardId') boardId: string,
        @Args('updateBoardInput') updateBoardInput: UpdateBoardInput, //
    ) {
        return await this.boardService.update({ userInfo, boardId, updateBoardInput });
    }

    @UseGuards(GqlAuthAccessGuard)
    @Mutation(() => Boolean)
    deleteBoard(
        @CurrentUser('userInfo') userInfo: ICurrentUser,
        @Args('boardId') boardId: string, //
    ) {
        return this.boardService.delete({ userInfo, boardId });
    }
}
