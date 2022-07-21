import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GenreService } from './genre.service';

import { ConflictException, UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';

import { Genre } from './entities/genre.entity';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';

@Resolver()
export class GenreResolver {
    constructor(
        private readonly genreService: GenreService, //
    ) {}

    @Query(() => [Genre])
    fetchGenres() {
        return this.genreService.findAll();
    }

    @UseGuards(GqlAuthAccessGuard)
    @Mutation(() => Genre)
    async createGenre(
        @Args('name') name: string, //
        @CurrentUser('userInfo') userInfo: ICurrentUser,
    ) {
        if (!userInfo.isServiceProvider) throw new ConflictException('관리자가 아닙니다!');
        return await this.genreService.create({ name });
    }

    @UseGuards(GqlAuthAccessGuard)
    @Mutation(() => Boolean)
    deleteGenre(
        @Args('genreId') genreId: string, //
        @CurrentUser('userInfo') userInfo: ICurrentUser,
    ) {
        if (!userInfo.isServiceProvider) throw new ConflictException('관리자가 아닙니다!');
        return this.genreService.delete({ genreId });
    }
}
