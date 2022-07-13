import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BoardreviewService } from './boardreview.service';
import { Boardreview } from './entities/boardreview.entity';

@Resolver()
export class BoardreviewResolver {
    constructor(
        private readonly boardreviewService: BoardreviewService, //
    ) {}

    @Mutation(() => Boardreview)
    async createBoardreview(
        @Args('id') id: string,
        @Args('content') content: string, //
    ) {
        return this.boardreviewService.create({ id, content });
    }

    @Mutation(() => Boolean)
    deleteBoardreview(
        @Args('id') id: string, //
    ) {
        return this.boardreviewService.delete({ id });
    }
}
