import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ConflictException, UseGuards } from '@nestjs/common';

import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';

import { CreateThemeInput } from './dto/createTheme.input';
import { UpdateThemeInput } from './dto/updateTheme.input';
import { ThemeService } from './theme.service';

import { Like } from '../user/entities/like.entity';
import { Theme } from './entities/theme.entity';
// import { ElasticsearchService } from '@nestjs/elasticsearch';

@Resolver()
export class ThemeResolver {
    constructor(
        private readonly themeService: ThemeService, // // private readonly elasticsearchService: ElasticsearchService,
    ) {}

    @Query(() => [Theme])
    fetchThemesAll() {
        // const searchResult = await this.elasticsearchService.search({
        //     index: 'roominus',
        //     body: {
        //         query: {
        //             bool: {

        //             }
        //             match_all: {},
        //         },
        //     },
        //     size: 100,
        // });
        // console.log(JSON.stringify(searchResult, null, ' '));

        return this.themeService.findAll();
    }

    @Query(() => [Theme])
    async fetchThemes(
        @Args('genreId', { nullable: true }) genreId: string, //
        @Args('page', { defaultValue: 1 }) page: number,
    ) {
        return await this.themeService.findPagination({ genreId, page });
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

    @UseGuards(GqlAuthAccessGuard)
    @Query(() => [Like])
    fetchUserLikeThemes(
        @Args('page', { defaultValue: 1 }) page: number,
        @CurrentUser('userInfo') userInfo: ICurrentUser, //
    ) {
        return this.themeService.findUserLikeList({ userInfo, page });
    }

    @UseGuards(GqlAuthAccessGuard)
    @Query(() => Int)
    fetchUserLikeThemesCount(
        @CurrentUser('userInfo') userInfo: ICurrentUser, //
    ) {
        return this.themeService.findUserLikeListCount({ userInfo });
    }

    // @Query(() => [Theme])
    // async searchThemes(
    //     @Args('title', { nullable: true }) title: string, //
    // ) {
    //     const result = await this.elasticsearchService.search({
    //         index: 'roominus', // 검색 대상(Collection)
    //         size: 100,
    //         body: {
    //             query: {
    //                 //검색 조건
    //                 bool: {
    //                     should: [{ prefix: { title } }],
    //                 },
    //             },
    //         },
    //     });

    //     console.log(JSON.stringify(result, null, ' '));
    // }

    @UseGuards(GqlAuthAccessGuard)
    @Mutation(() => Theme)
    createTheme(
        @Args('cafeName') cafeName: string, //
        @Args('genreName') genreName: string, //
        @Args('createThemeInput') createThemeInput: CreateThemeInput,
        @CurrentUser('userInfo') userInfo: ICurrentUser,
    ) {
        if (!userInfo.isserviceprovider) throw new ConflictException('관리자가 아닙니다!');
        return this.themeService.create({ cafeName, genreName, createThemeInput });
    }

    @UseGuards(GqlAuthAccessGuard)
    @Mutation(() => Theme)
    updateTheme(
        @Args('themeId') themeId: string,
        @Args('updateThemeInput') updateThemeInput: UpdateThemeInput, //
        @CurrentUser('userInfo') userInfo: ICurrentUser,
    ) {
        if (!userInfo.isserviceprovider) throw new ConflictException('관리자가 아닙니다!');
        return this.themeService.update({ themeId, updateThemeInput });
    }

    @UseGuards(GqlAuthAccessGuard)
    @Mutation(() => Boolean)
    deleteTheme(
        @Args('themeId') themeId: string, //
        @CurrentUser('userInfo') userInfo: ICurrentUser,
    ) {
        if (!userInfo.isserviceprovider) throw new ConflictException('관리자가 아닙니다!');
        return this.themeService.delete({ themeId });
    }

    @UseGuards(GqlAuthAccessGuard)
    @Mutation(() => Boolean)
    createLikeTheme(
        @Args('themeId') themeId: string,
        @CurrentUser('userInfo') userInfo: ICurrentUser, //
    ) {
        return this.themeService.createLike({ themeId, userInfo });
    }
}
