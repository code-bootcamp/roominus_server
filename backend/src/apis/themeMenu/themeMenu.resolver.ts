import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ThemeMenuService } from './themeMenu.service';
import { CreateThemeMenuInput } from './dto/createThemeMenu.Input';

import { ThemeMenu } from './entities/themeMenu.entity';

@Resolver()
export class ThemeMenuResolver {
    constructor(
        private readonly themeMenuService: ThemeMenuService, //
    ) {}

    @Query(() => ThemeMenu)
    fetchThemeMenu() {
        return this.themeMenuService.findOne();
    }

    @Mutation(() => ThemeMenu)
    createThemeMenu(
        @Args('createThemeMenuInput') createThemeMenuInput: CreateThemeMenuInput, //
    ) {
        return this.themeMenuService.create({ createThemeMenuInput });
    }
}