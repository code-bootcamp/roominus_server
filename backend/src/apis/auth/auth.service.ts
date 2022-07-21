import { CACHE_MANAGER, ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as jwt from 'jsonwebtoken';
import { Cache } from 'cache-manager';
import { SocialUserService } from '../socialUser/socialUser.service';

interface IlogoutToken {
    email: string;
    id: string;
    iat: number;
    exp: number;
}

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService, //
        private readonly userService: UserService,
        @Inject(CACHE_MANAGER)
        private readonly cacheMananger: Cache,
        private readonly socialuserService: SocialUserService,
    ) {}

    setRefreshToken({ user, res }) {
        const refreshToken = this.jwtService.sign(
            { email: user.email, id: user.id, isServiceProvider: user.isserviceprovider },
            { secret: process.env.REFRESH_TOKEN_KEY, expiresIn: '1h' },
        );

        // res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`);

        // // 배포환경
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.setHeader(
            'Set-Cookie',
            `refreshToken=${refreshToken}; path=/; domain=.wawoong.shop; SameSite=None; Secure; httpOnly;`,
        );
    }

    validationToken({ accessToken, refreshToken }) {
        console.log('-----------------');
        console.log(accessToken);
        console.log('-----------------');
        console.log('-----------------');
        console.log(refreshToken);
        console.log('-----------------');

        try {
            jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY);
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);

            return true;
        } catch (error) {
            throw new UnauthorizedException('유효하지 않은 소셜 엑세스 토큰입니다', error);
        }
    }

    getAccessToken({ user }) {
        return this.jwtService.sign(
            { email: user.email, id: user.id, isServiceProvider: user.isserviceprovider },
            { secret: process.env.ACCESS_TOKEN_KEY, expiresIn: '1h' },
        );
    }

    getSocialAccessToken({ socialUser }) {
        return this.jwtService.sign(
            { email: socialUser.email, phone: socialUser.phone },
            { secret: process.env.ACCESS_TOKEN_KEY, expiresIn: '1h' },
        );
    }

    setSocialRefreshToken({ socialUser, res }) {
        const socialrefreshToken = this.jwtService.sign(
            { email: socialUser.email, phone: socialUser.phone },
            { secret: process.env.REFRESH_TOKEN_KEY, expiresIn: '1h' },
        );
        // res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`);

        // 배포환경
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.setHeader(
            'Set-Cookie',
            `refreshToken=${socialrefreshToken}; path=/; domain=.wawoong.shop; SameSite=None; Secure; httpOnly;`,
        );
    }

    async saveToken({ accessToken, refreshToken }) {
        const verifyAccess: any = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY);
        const verifyRefresh: any = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);

        try {
            // 토큰 저장
            const saveAccess = await this.cacheMananger.set(`accessToken:${accessToken}`, 'accessToken', {
                ttl: verifyAccess.exp - verifyAccess.iat,
            });
            const saveRefresh = await this.cacheMananger.set(`refreshToken:${refreshToken}`, 'refreshToken', {
                ttl: verifyRefresh.exp - verifyRefresh.iat,
            });

            if (saveAccess === 'OK' && saveRefresh === 'OK') return true;
        } catch (error) {
            throw new ConflictException('토큰을 저장하지 못했습니다!!', error);
        }
    }
}
