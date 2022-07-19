import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ThemeReivewService } from './themewReview.service';
import { CreateThemeReviewInput } from './dto/createThemeReview.input';
import { UpdateThemeReviewInput } from './dto/updateThemeReview.input';

import { ThemeReview } from './entities/themeReview.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';

@Resolver()
export class ThemeReivewResolver {
    constructor(
        private readonly themeReviewService: ThemeReivewService, //
    ) {}

    @Query(() => [ThemeReview])
    async fetchThemeReviews(
        @Args('themeId') themeId: string, //
        @Args('page', { defaultValue: 1 }) page: number,
    ) {
        return await this.themeReviewService.findAll({ themeId, page });
    }

    @Query(() => Int)
    fetchThemeReviewsCount() {
        return this.themeReviewService.findAllCount();
    }

    @UseGuards(GqlAuthAccessGuard)
    @Query(() => [ThemeReview])
    fetchThemesUser(
        @CurrentUser('userInfo') userInfo: ICurrentUser, //
    ) {
        return this.themeReviewService.findwithUser({ userInfo });
    }

    @Mutation(() => ThemeReview)
    createThemeReview(
        @Args('themeId') themeId: string,
        @Args('createThemeReviewInput') createThemeReviewInput: CreateThemeReviewInput,
    ) {
        return this.themeReviewService.create({ themeId, createThemeReviewInput });
    }

    @Mutation(() => ThemeReview)
    updateThemeReview(
        @Args('themeReviewId') themeReviewId: string,
        @Args('updateThemeReviewInput') updateThemeReviewInput: UpdateThemeReviewInput,
    ) {
        return this.themeReviewService.update({ themeReviewId, updateThemeReviewInput });
    }

    @Mutation(() => Boolean)
    deleteThemeReview(
        @Args('themeReviewId') themeReviewId: string, //
    ) {
        return this.themeReviewService.delete({ themeReviewId });
    }
}
