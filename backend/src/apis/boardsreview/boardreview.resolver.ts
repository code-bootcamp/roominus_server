import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardreviewService } from './boardreview.service';
import { CreateBoardreviewInput } from './dto/createBoardreview.input';
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

    @Mutation(() => Boardreview)
    async createBoardreview(
        @Args('createBoardreviewInput') createBoardreviewInput: CreateBoardreviewInput, //
    ) {
        return this.boardreviewService.create({ createBoardreviewInput });
    }

    @Mutation(() => Boolean)
    deleteBoardreview(
        @Args('id') id: string, //
    ) {
        return this.boardreviewService.delete({ id });
    }
}
