import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Cache } from 'cache-manager';

export class JwtAccessStreategy extends PassportStrategy(Strategy, 'access') {
    constructor() {
        // private readonly cacheManager: Cache, // @Inject(CACHE_MANAGER)

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //
            secretOrKey: process.env.ACCESS_TOKEN_KEY,
            passReqToCallback: true,
        });
    }

    validate(req, payload) {
        return {
            email: payload.email, //
            id: payload.id,
            isServiceProvider: payload.isServiceProvider,
        };
    }
}
