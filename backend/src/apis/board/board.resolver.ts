import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

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

    @Query(() => Board)
    fetchBoards() {
        return this.boardService.findAll();
    }

    @Query(() => Board)
    fetchBoard(@Args('id') id: string) {
        return this.boardService.findOne({ id });
    }

    @Mutation(() => Board)
    async updateBoard(
        @Args('updateBoardInput') updateBoardInput: UpdateBoardInput, //
    ) {
        return await this.boardService.update({ updateBoardInput });
    }

    @Mutation(() => Boolean)
    deleteBoard(
        @Args('title') title: string, //
    ) {
        return this.boardService.delete({ title });
    }
}
