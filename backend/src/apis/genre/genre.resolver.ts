import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GenreService } from './genre.service';

import { Genre } from './entities/genre.entity';

@Resolver()
export class GenreResolver {
    constructor(
        private readonly genreService: GenreService, //
    ) {}

    @Query(() => [Genre])
    fetchGenres() {
        return this.genreService.findAll();
    }

    @Mutation(() => Genre)
    async createGenre(@Args('name') name: string) {
        return await this.genreService.create({ name });
    }

    @Mutation(() => Boolean)
    deleteGenre(
        @Args('genreId') genreId: string, //
    ) {
        return this.genreService.delete({ genreId });
    }
}
