import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ConflictException, UseGuards } from '@nestjs/common';

import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';

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

    @UseGuards(GqlAuthAccessGuard)
    @Mutation(() => ThemeMenu)
    createThemeMenu(
        @Args('createThemeMenuInput') createThemeMenuInput: CreateThemeMenuInput, //
        @CurrentUser('userInfo') userInfo: ICurrentUser,
    ) {
        if (!userInfo.isServiceProvider) throw new ConflictException('관리자가 아닙니다!');

        return this.themeMenuService.create({ createThemeMenuInput });
    }

    @UseGuards(GqlAuthAccessGuard)
    @Mutation(() => Boolean)
    deleteThemeMenu(
        @Args('themeMenuId') themeMenuId: string, //
        @CurrentUser('userInfo') userInfo: ICurrentUser,
    ) {
        if (!userInfo.isServiceProvider) throw new ConflictException('관리자가 아닙니다!');

        return this.themeMenuService.delete({ themeMenuId });
    }
}
