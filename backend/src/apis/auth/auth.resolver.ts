import { CACHE_MANAGER, Inject, UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Cache } from 'cache-manager';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import { SocialUserService } from '../socialUser/socialUser.service';
import { AuthService } from './auth.service';

import { GqlAuthAccessGuard, GqlAuthRefreshGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { UserService } from '../user/user.service';

import { User } from '../user/entities/user.entity';
import { SocialUser } from '../socialUser/entities/socialUser.entity';

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
        private readonly socialuserService: SocialUserService,
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
        this.authService.setRefreshToken({ user, res: context.res });

        // 5. 일치하는 유저가 있으면?! accessToken(=JWT)을 만들어서 브라우저에 전달하기
        return this.authService.getAccessToken({ user });
    }

    @Mutation(() => String)
    async SocialLogin(
        @Args('email') email: string, //
        @Args('phone') phone: string,
        @Context() context: IContext,
    ) {
        // 1. 로그인 @@
        const socialUser = await this.socialuserService.findOne({ email });
        // console.log(socialUser);
        // 2. 일치하는 유저가 없으면?! 에러 던지기!!!
        if (!socialUser) throw new UnprocessableEntityException('아이디가 없습니다.');

        // 3. 일치하는 유저가 있지만,   전화번호가 틀렸다면?! 에러 던지기!!!

        if (phone !== socialUser.phone) throw new UnprocessableEntityException('암호가 틀렸습니다.');

        // 4. refreshToken(=JWT)을 만들어서 프론트엔드(쿠키)에 보내주기
        this.authService.setSocialRefreshToken({ socialUser, res: context.res });

        // 5. 일치하는 유저가 있으면?! accessToken(=JWT)을 만들어서 브라우저에 전달하기
        return this.authService.getSocialAccessToken({ socialUser });
    }

    @Query(() => User)
    async fetchUserLoggedIn(
        @Context() context: any, //
    ) {
        const accessToken = context.req.headers.authorization.replace('Bearer ', '');
        ///const accessToken = context.req.headers.authorization.split(' ')[1];
        const refreshToken = context.req.headers.cookie.replace('refreshToken=', '');
        // const refreshToken = context.req.headers.cookie.split('=')[1];

        const aaa = jwt.verify(accessToken, 'myAccessKey');

        const isValidation = this.authService.validationToken({
            accessToken,
            refreshToken,
        });
        if (isValidation === true) {
            return await this.userService.findOne({ email: aaa['email'] });
        } else {
            return '오류';
        }
    }

    @Query(() => SocialUser)
    async fetchSocialUserLoggedIn(
        @Context() context: any, //
    ) {
        const headersAuthoriztion = context.req.headers.authorization;
        const headersCookie = context.req.headers.cookie;

        if (!headersAuthoriztion) throw new UnprocessableEntityException('엑세스 토큰이 없습니다!!');
        if (!headersCookie) throw new UnprocessableEntityException('리프레쉬 토큰이 없습니다!!');

        const accessToken = context.req.headers.authorization.replace('Bearer ', '');
        ///const accessToken = context.req.headers.authorization.split(' ')[1];
        const refreshToken = context.req.headers.cookie.replace('refreshToken=', '');
        // const refreshToken = context.req.headers.cookie.split('=')[1];

        // console.log('-------------------');
        // console.log(accessToken);
        // console.log('-------------------');
        // console.log('-------------------');
        // console.log(refreshToken);
        // console.log('-------------------');

        const aaa = jwt.verify(accessToken, 'myAccessKey');
        const isValidation = this.authService.validationToken({
            accessToken,
            refreshToken,
        });

        if (isValidation === true) {
            return await this.socialuserService.findOne({ email: aaa['email'] });
        } else {
            return '오류';
        }
    }

    @UseGuards(GqlAuthAccessGuard)
    @Mutation(() => String)
    async logout(@Context() context: any) {
        const headersAuthoriztion = context.req.headers.authorization;
        const headersCookie = context.req.headers.cookie;

        if (!headersAuthoriztion) throw new UnprocessableEntityException('엑세스 토큰이 없습니다!!');
        if (!headersCookie) throw new UnprocessableEntityException('리프레쉬 토큰이 없습니다!!');

        const accessToken = context.req.headers.authorization.replace('Bearer ', '');
        const refreshToken = context.req.headers.cookie.replace('refreshToken=', '');

        const isValidation = this.authService.validationToken({
            accessToken,
            refreshToken,
        });
        console.log(isValidation);
        if (isValidation) {
            const isSave = this.authService.saveToken({ accessToken, refreshToken });

            if (isSave) {
                return '로그아웃에 성공했습니다.';
            }
        }

        return '로그아웃 실패!!';

        // console.log(jwt.verify(accessToken, 'myAccessKey'));
        // try {
        //     jwt.verify(accessToken, 'myAccessKey');
        //     jwt.verify(refreshToken, 'myRefreshKey');
        // } catch {
        //     throw new UnauthorizedException('오류');
        // }

        // // const userId = jwt.decode(accessToken).sub;
        // // await this.cacheManager.set(`accessToken:${accessToken}`, userId, { ttl: 0 });
        // // await this.cacheManager.set(`refreshToken:${refreshToken}`, userId, {
        // //     ttl: 0,
        // // });
        // return '로그아웃';
    }

    @UseGuards(GqlAuthRefreshGuard)
    @Mutation(() => String)
    restoreAccessToken(
        @CurrentUser() currentUser: any, //
    ) {
        // await this.cacheManager.set(`accessToken:${currentUser.accessToken}`, currentUser.id, {
        //     ttl: 0,
        // });

        const aaa = this.authService.getAccessToken({ user: currentUser });

        return aaa;
    }
}
