import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BoardsecondreviewService } from './boardsecondreview.service';
import { Boardsecondreview } from './entities/boardsecondreview.entity';

@Resolver()
export class BoardsecondreviewResolver {
    constructor(
        private readonly boardsecondreviewService: BoardsecondreviewService, //
    ) {}

    @Mutation(() => Boardsecondreview)
    async createBoardsecondreview(
        @Args('boardreviewId') boardreviewId: string,
        @Args('content') content: string, //
    ) {
        return this.boardsecondreviewService.create({ content, boardreviewId });
    }

    @Mutation(() => Boolean)
    deleteBoardsecondreview(
        @Args('id') id: string, //
    ) {
        return this.boardsecondreviewService.delete({ id });
    }
}
