import {
    CACHE_MANAGER,
    ConflictException,
    Inject,
    UnauthorizedException,
    UnprocessableEntityException,
    UseGuards,
} from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import * as jwt from 'jsonwebtoken';
import { GqlAuthAccessGuard, GqlAuthRefreshGuard } from 'src/commons/auth/gql-auth.guard';
import { Cache } from 'cache-manager';
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
        private readonly cacheManager: Cache,
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

    @Query(() => User)
    async fetchUserLoggedIn(
        @Context() context: any, //
    ) {
        console.log('Input acceessToken');
        console.log(context.req.headers.authorization);
        console.log('Input refreshToken');
        console.log(context.req.headers.cookie);
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
    @UseGuards(GqlAuthAccessGuard)
    @Mutation(() => String)
    async logout(@Context() context: any) {
        const accessToken = context.req.headers.authorization.replace('Bearer ', '');
        const refreshToken = context.req.headers.cookie.replace('refreshToken=', '');

        try {
            jwt.verify(accessToken, 'myAccessKey');
            jwt.verify(refreshToken, 'myRefreshKey');
        } catch {
            throw new UnauthorizedException('오류');
        }

        const userId = jwt.decode(accessToken)['id'];
        await this.cacheManager.set(`accessToken:${accessToken}`, userId, { ttl: 0 });
        await this.cacheManager.set(`refreshToken:${refreshToken}`, userId, {
            ttl: 0,
        });
        return '로그아웃';
    }

    @UseGuards(GqlAuthRefreshGuard)
    @Mutation(() => String)
    async restoreAccessToken(
        @CurrentUser() currentUser: any, //
    ) {
        // await this.cacheManager.set(`accessToken:${currentUser.accessToken}`, currentUser.id, {
        //     ttl: 0,
        // });
        return this.authService.getAccessToken({ user: currentUser });
    }
}
