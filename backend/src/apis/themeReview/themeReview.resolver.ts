import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ThemeReivewService } from './themewReview.service';
import { CreateThemeReviewInput } from './dto/createThemeReview.input';
import { UpdateThemeReviewInput } from './dto/updateThemeReview.input';

import { ThemeReview } from './entities/themeReview.entity';

@Resolver()
export class ThemeReivewResolver {
    constructor(
        private readonly themeReviewService: ThemeReivewService, //
    ) {}

    @Query(() => ThemeReview)
    fetchThemeReviews(
        @Args('themeId') themeId: string, //
    ) {
        return this.themeReviewService.findAll({ themeId });
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
        @Args('id') id: string, //
    ) {
        return this.themeReviewService.delete({ id });
    }
}
