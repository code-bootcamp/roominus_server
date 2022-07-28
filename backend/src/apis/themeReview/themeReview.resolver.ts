import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';

import { CreateThemeReviewInput } from './dto/createThemeReview.input';
import { UpdateThemeReviewInput } from './dto/updateThemeReview.input';
import { ThemeReivewService } from './themewReview.service';

import { ThemeReview } from './entities/themeReview.entity';

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
    fetchThemeReviewsUser(
        @Args('page', { defaultValue: 1 }) page: number,
        @CurrentUser('userInfo') userInfo: ICurrentUser, //
    ) {
        return this.themeReviewService.findwithUser({ userInfo, page });
    }

    @UseGuards(GqlAuthAccessGuard)
    @Query(() => Int)
    async fetchThemeReviewsUserCount(
        @CurrentUser('userInfo') userInfo: ICurrentUser, //
    ) {
        return await this.themeReviewService.findwithUserCount({ userInfo });
    }

    @UseGuards(GqlAuthAccessGuard)
    @Mutation(() => ThemeReview)
    createThemeReview(
        @Args('themeId') themeId: string,
        @CurrentUser('userInfo') userInfo: ICurrentUser,
        @Args('createThemeReviewInput') createThemeReviewInput: CreateThemeReviewInput,
    ) {
        return this.themeReviewService.create({ userInfo, themeId, createThemeReviewInput });
    }

    @UseGuards(GqlAuthAccessGuard)
    @Mutation(() => ThemeReview)
    updateThemeReview(
        @Args('themeReviewId') themeReviewId: string,
        @CurrentUser('userInfo') userInfo: ICurrentUser,
        @Args('updateThemeReviewInput') updateThemeReviewInput: UpdateThemeReviewInput,
    ) {
        return this.themeReviewService.update({ userInfo, themeReviewId, updateThemeReviewInput });
    }

    @UseGuards(GqlAuthAccessGuard)
    @Mutation(() => Boolean)
    deleteThemeReview(
        @Args('themeReviewId') themeReviewId: string, //
        @CurrentUser('userInfo') userInfo: ICurrentUser,
    ) {
        return this.themeReviewService.delete({ userInfo, themeReviewId });
    }
}
