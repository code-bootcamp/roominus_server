import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';

import { BoardService } from './board.service';
import { CreateBoardInput } from './dto/createBoard.input';
import { UpdateBoardInput } from './dto/updateBoard.input';

import { Board } from './entities/board.entity';
import { BoardLike } from './entities/boardLike.entity';

@Resolver()
export class BoardResolver {
    constructor(
        private readonly boardService: BoardService, //
    ) {}

    @Query(() => [Board])
    fetchBoards(
        @Args('page', { defaultValue: 1 }) page: number, //
    ) {
        return this.boardService.findAll({ page });
    }

    @Query(() => Int)
    fetchBoardsCount() {
        return this.boardService.findAllCount();
    }

    @Query(() => Board)
    fetchBoard(
        @Args('id') id: string, //
    ) {
        return this.boardService.findOne({ id });
    }

    @Query(() => Board)
    fetchBoardComments(
        @Args('page', { nullable: true }) page: number, //
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
    @Query(() => [BoardLike])
    fetchUserLikeBoards(
        @Args('page', { defaultValue: 1 }) page: number,
        @CurrentUser('userInfo') userInfo: ICurrentUser, //
    ) {
        return this.boardService.findUserLikeList({ userInfo, page });
    }

    @UseGuards(GqlAuthAccessGuard)
    @Query(() => Int)
    fetchUserLikeBoardsCount(
        @CurrentUser('userInfo') userInfo: ICurrentUser, //
    ) {
        return this.boardService.findUserLikeListCount({ userInfo });
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

    @UseGuards(GqlAuthAccessGuard)
    @Mutation(() => Boolean)
    createLikeBoard(
        @Args('boardId') boardId: string, //
        @CurrentUser('userInfo') userInfo: ICurrentUser,
    ) {
        return this.boardService.createLike({ boardId, userInfo });
    }
}
