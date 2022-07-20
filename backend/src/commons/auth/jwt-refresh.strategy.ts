import { CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Cache } from 'cache-manager';
import { Strategy } from 'passport-jwt';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
    constructor(
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache, //
    ) {
        super({
            jwtFromRequest: req => {
                const cookie = req.headers.cookie;
                const refreshToken = cookie.replace('refreshToken=', '');
                return refreshToken;
            },
            secretOrKey: process.env.REFRESH_TOKEN_KEY,
            passReqToCallback: true,
        });
    }

    async validate(req, payload) {
        const refreshToken = req.headers.cookie.split('=')[1];

        const hasRefreshToken = await this.cacheManager.get(`refreshToken:${refreshToken}`);
        if (hasRefreshToken) throw new UnauthorizedException('로그인 후 사용해주세요!');

        return {
            email: payload.email,
            id: payload.id,
            isServiceProvider: payload.isServiceProvider,
        };
    }
}
