import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

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
    @Mutation(() => Board)
    async createBoard(
        @Args('createBoardInput') createBoardInput: CreateBoardInput, //
    ) {
        return this.boardService.create({ createBoardInput });
    }

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
        @Args('page') page: number, //
        @Args('boardId') boardId: string,
    ) {
        return this.boardService.findboardcomments({ page, boardId });
    }

    @UseGuards(GqlAuthAccessGuard)
    @Query(() => [Board])
    fetchBoardsUser(
        @CurrentUser('userInfo') userInfo: ICurrentUser, //
    ) {
        return this.boardService.findwithUser({ userInfo });
    }

    @Mutation(() => Board)
    async updateBoard(
        @Args('boardId') boardId: string,
        @Args('updateBoardInput') updateBoardInput: UpdateBoardInput, //
    ) {
        return await this.boardService.update({ boardId, updateBoardInput });
    }

    @Mutation(() => Boolean)
    deleteBoard(
        @Args('title') title: string, //
    ) {
        return this.boardService.delete({ title });
    }
}
