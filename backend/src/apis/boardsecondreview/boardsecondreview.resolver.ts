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
        @Args('id') id: string,
        @Args('content') content: string, //
    ) {
        return this.boardsecondreviewService.create({ id, content });
    }

    @Mutation(() => Boolean)
    deleteBoardsecondreview(
        @Args('id') id: string, //
    ) {
        return this.boardsecondreviewService.delete({ id });
    }
}
