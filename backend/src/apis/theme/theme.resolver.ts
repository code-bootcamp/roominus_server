import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ThemeService } from './theme.service';

import { CreateThemeInput } from './dto/createTheme.input';
import { UpdateThemeInput } from './dto/updateTheme.input';

import { Theme } from './entities/theme.entity';

@Resolver()
export class ThemeResolver {
    constructor(
        private readonly themeService: ThemeService, //
    ) {}

    @Query(() => [Theme])
    async fetchThemes(
        @Args('genreId', { nullable: true }) genreId: string, //
        @Args('page', { defaultValue: 1 }) page: number,
    ) {
        return await this.themeService.findAll({ genreId, page });
    }

    @Query(() => Int)
    fetchThemesCount() {
        return this.themeService.findAllCount();
    }

    @Query(() => Theme)
    fetchTheme(
        @Args('themeId') themeId: string, //
    ) {
        return this.themeService.findOne({ themeId });
    }

    @Query(() => [Theme])
    fetchThemesOnTheme(
        @Args('cafeId') cafeId: string, //
    ) {
        return this.themeService.findAllwithTheme({ cafeId });
    }

    @Mutation(() => Theme)
    createTheme(
        @Args('cafeName') cafeName: string, //
        @Args('genreName') genreName: string, //
        @Args('createThemeInput') createThemeInput: CreateThemeInput,
    ) {
        return this.themeService.create({ cafeName, genreName, createThemeInput });
    }

    @Mutation(() => Theme)
    updateTheme(
        @Args('themeId') themeId: string,
        @Args('updateThemeInput')
        updateThemeInput: UpdateThemeInput, //
    ) {
        return this.themeService.update({ themeId, updateThemeInput });
    }

    @Mutation(() => Boolean)
    deleteTheme(
        @Args('themeId') themeId: string, //
    ) {
        return this.themeService.delete({ themeId });
    }
}
