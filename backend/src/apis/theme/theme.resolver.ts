import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ThemeServie } from './theme.service';

import { Theme } from './entities/theme.entity';
import { CreateThemeInput } from './dto/createTheme.input';
import { UpdateThemeInput } from './dto/updaeteTheme.input';

@Resolver()
export class ThemeResolver {
    constructor(
        private readonly themeService: ThemeServie, //
    ) {}

    @Query(() => [Theme])
    fetchThemes() {
        return this.themeService.findAll();
    }

    @Query(() => Theme)
    fetchTheme(
        @Args('title') title: string, //
    ) {
        return this.themeService.findOne({ title });
    }

    @Mutation(() => Theme)
    createTheme(
        @Args('createThemeInput') createThemeInput: CreateThemeInput, //
    ) {
        return this.themeService.create({ createThemeInput });
    }

    @Mutation(() => Theme)
    updateTheme(
        @Args('updateThemeInput') updateThemeInput: UpdateThemeInput, //
    ) {
        return this.themeService.update({ updateThemeInput });
    }

    @Mutation(() => Boolean)
    deleteTheme(
        @Args('title') title: string, //
    ) {
        return this.themeService.delete({ title });
    }
}
