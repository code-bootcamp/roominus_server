import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as jwt from 'jsonwebtoken';
// import { Cache } from 'cache-manager';
@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService, //
        private readonly userService: UserService,
    ) {}

    setRefreshToken({ user, res }) {
        const refreshToken = this.jwtService.sign(
            { email: user.email, id: user.id, isServiceProvider: user.isserviceprovider },
            { secret: process.env.REFRESH_TOKEN_KEY, expiresIn: '1h' },
        );

        res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`);

        // 배포환경
        // res.setHeader('Access-Control-Allow-Origin', 'https://myfrontsite.com')
        // res.setHeader(
        //   'Set-Cookie',
        //   `refreshToken=${refreshToken}; path=/; domain=.mybacksite.com; SameSite=None; Secure; httpOnly;`
        // )
    }

    validationToken({ accessToken, refreshToken }) {
        try {
            jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY);
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);

            // console.log('=====', verifyAccess, verifyRefresh);
            return true;
        } catch (error) {
            throw new UnauthorizedException('유효하지 않은 엑세스 토큰입니다', error);
        }
    }

    getAccessToken({ user }) {
        return this.jwtService.sign(
            { email: user.email, id: user.id, isServiceProvider: user.isserviceprovider },
            { secret: process.env.ACCESS_TOKEN_KEY, expiresIn: '1h' },
        );
    }

    // async saveToken({ accessToken, refreshToken }) {
    //     const verifyAccess: any = jwt.verify(accessToken, process.env.AccessKey);
    //     const verifyRefresh: any = jwt.verify(refreshToken, process.env.RefreshKey);

    //     try {
    //         // 토큰 저장
    //         const saveAccess = await this.cacheManager.set(`accessToken:${accessToken}`, 'accessToken', {
    //             ttl: verifyAccess.exp - verifyAccess.iat,
    //         });

    //         const saveRefresh = await this.cacheManager.set(`refreshToken:${refreshToken}`, 'refreshToken', {
    //             ttl: verifyRefresh.exp - verifyRefresh.iat,
    //         });

    //         if (saveAccess === 'OK' && saveRefresh === 'OK') return true;
    //     } catch (error) {
    //         throw new ConflictException('토큰을 저장하지 못했습니다!!', error);
    //     }
    // }
}
