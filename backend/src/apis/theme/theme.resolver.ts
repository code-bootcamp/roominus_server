import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ThemeService } from './theme.service';

import { Theme } from './entities/theme.entity';
import { CreateThemeInput } from './dto/createTheme.input';
import { UpdateThemeInput } from './dto/updaeteTheme.input';

@Resolver()
export class ThemeResolver {
    constructor(
        private readonly themeService: ThemeService, //
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
        @Args('cafeName') cafeName: string, //
        @Args('genreName') genreName: string, //
        @Args('createThemeInput') createThemeInput: CreateThemeInput,
    ) {
        return this.themeService.create({ cafeName, genreName, createThemeInput });
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
