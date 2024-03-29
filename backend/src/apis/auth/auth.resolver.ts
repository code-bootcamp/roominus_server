import { CACHE_MANAGER, Inject, UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Cache } from 'cache-manager';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import { AuthService } from './auth.service';

import { GqlAuthAccessGuard, GqlAuthRefreshGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';
import { UserService } from '../user/user.service';

import { User } from '../user/entities/user.entity';

interface IContext {
    req: Request;
    res: Response;
}

@Resolver()
export class AuthResolver {
    constructor(
        private readonly userService: UserService, //
        private readonly authService: AuthService, //
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache, //
    ) {}

    @Mutation(() => String)
    async Login(
        @Args('email') email: string, //
        @Args('password') password: string,
        @Context() context: IContext,
    ) {
        // 1. 로그인 @@
        const user = await this.userService.findOne({ email });

        // 2. 일치하는 유저가 없으면?! 에러 던지기!!!
        if (!user) throw new UnprocessableEntityException('아이디가 없습니다.');

        // 3. 일치하는 유저가 있지만, 비밀번호가 틀렸다면?! 에러 던지기!!!
        const isAuth = await bcrypt.compare(password, user.password);
        if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');

        // 4. refreshToken(=JWT)을 만들어서 프론트엔드(쿠키)에 보내주기
        this.authService.setRefreshToken({ user, res: context.res, req: context.req });

        // 5. 일치하는 유저가 있으면?! accessToken(=JWT)을 만들어서 브라우저에 전달하기
        return this.authService.getAccessToken({ user });
    }

    @Mutation(() => String)
    async SocialLogin(
        @Args('email') email: string, //
        @Context() context: IContext,
    ) {
        // 1. 로그인 @@
        const socialUser = await this.userService.findOne({ email });
        // console.log(socialUser);
        // 2. 일치하는 유저가 없으면?! 에러 던지기!!!
        if (!socialUser) throw new UnprocessableEntityException('이메일이 틀렸습니다.');

        // 3. refreshToken(=JWT)을 만들어서 프론트엔드(쿠키)에 보내주기
        this.authService.setRefreshToken({ user: socialUser, res: context.res, req: context.req });

        // 4. 일치하는 유저가 있으면?! accessToken(=JWT)을 만들어서 브라우저에 전달하기
        return this.authService.getAccessToken({ user: socialUser });
    }

    @UseGuards(GqlAuthAccessGuard)
    @Query(() => User)
    async fetchUserLoggedIn(
        // @Context() context: any, //
        @CurrentUser('userInfo') userInfo: ICurrentUser,
    ) {
        return await this.userService.findOne({ email: userInfo.email });
    }

    @UseGuards(GqlAuthAccessGuard)
    @Mutation(() => String)
    async logout(@Context() context: any) {
        const headersAuthoriztion = context.req.headers.authorization;

        const headersCookie = context.req.headers.cookie;

        if (!headersAuthoriztion) throw new UnprocessableEntityException('소셜 엑세스 토큰이 없습니다!!');
        if (!headersCookie) throw new UnprocessableEntityException('소셜 리프레쉬 토큰이 없습니다!!');

        const accessToken = context.req.headers.authorization.replace('Bearer ', '');
        const refreshToken = context.req.headers.cookie.replace('refreshToken=', '');

        const isValidation = this.authService.validationToken({
            accessToken,
            refreshToken,
        });

        if (isValidation) {
            const isSave = this.authService.saveToken({ accessToken, refreshToken });

            if (isSave) {
                return '로그아웃에 성공했습니다.';
            }
        }

        return '로그아웃 실패!!';
    }

    @UseGuards(GqlAuthRefreshGuard)
    @Mutation(() => String)
    restoreAccessToken(
        @CurrentUser('userInfo') userInfo: ICurrentUser, //
    ) {
        const aaa = this.authService.getAccessToken({ user: userInfo });

        return aaa;
    }
}
