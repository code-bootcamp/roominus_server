import { CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Cache } from 'cache-manager';

export class JwtAccessStreategy extends PassportStrategy(Strategy, 'access') {
    constructor(
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache, //
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //
            secretOrKey: process.env.ACCESS_TOKEN_KEY,
            passReqToCallback: true,
        });
    }

    async validate(req, payload) {
        const accessToken = req.headers.authorization.split(' ')[1];

        const hasAccessToken = await this.cacheManager.get(`accessToken:${accessToken}`);
        if (hasAccessToken) throw new UnauthorizedException('로그인 후 사용해주세요!');

        return {
            email: payload.email, //
            id: payload.id,
            isServiceProvider: payload.isServiceProvider,
        };
    }
}
