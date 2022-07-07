import { Mutation, Query, Resolver } from '@nestjs/graphql';

import { ThemeServie } from './theme.service';

import { Theme } from './entities/theme.entity';

@Resolver()
export class ThemeResolver {
    constructor(
        private readonly themeService: ThemeServie, //
    ) {}

    @Query(() => Theme)
    fetchThemes() {
        return this.themeService.findAll();
    }

    @Query(() => Theme)
    fetchTheme() {
        return this.themeService.findOne();
    }

    @Mutation()
    createTheme() {
        return this.themeService.create();
    }
}
