import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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

    @Mutation(() => Boardsecondreview)
    async createBoardsecondreview(
        @Args('createBoardsecondreviewInput') createBoardsecondreviewInput: CreateBoardsecondreviewInput,
    ) {
        return this.boardsecondreviewService.create({ createBoardsecondreviewInput });
    }

    @Mutation(() => Boolean)
    deleteBoardsecondreview(
        @Args('id') id: string, //
    ) {
        return this.boardsecondreviewService.delete({ id });
    }
}
