import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { async } from 'rxjs';
import { Genre } from './entities/genre.entity';
import { GenreService } from './genre.service';

@Resolver()
export class GenreResolver {
    constructor(
        private readonly genreService: GenreService, //
    ) {}

    @Mutation(() => Genre)
    async createGenre(@Args('name') name: string) {
        return await this.genreService.create({ name });
    }

    @Mutation(() => Boolean)
    deleteGenre(
        @Args('name') name: string, //
    ) {
        return this.genreService.delete({ name });
    }
}
