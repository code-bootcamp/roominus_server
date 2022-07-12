import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ThemeMenuService } from './themeMenu.service';
import { CreateThemeMenuInput } from './dto/createThemeMenu.Input';

import { ThemeMenu } from './entities/themeMenu.entity';

@Resolver()
export class ThemeMenuResolver {
    constructor(
        private readonly themeMenuService: ThemeMenuService, //
    ) {}

    @Query(() => [ThemeMenu])
    fetchThemeMenus(
        @Args('themeId') themeId: string, //
    ) {
        return this.themeMenuService.findAll({ themeId });
    }

    @Mutation(() => ThemeMenu)
    createThemeMenu(
        @Args('createThemeMenuInput') createThemeMenuInput: CreateThemeMenuInput, //
    ) {
        return this.themeMenuService.create({ createThemeMenuInput });
    }

    @Mutation(() => Boolean)
    deleteThemeMenu(
        @Args('themeMenuId') themeMenuId: string, //
    ) {
        return this.themeMenuService.delete({ themeMenuId });
    }
}
