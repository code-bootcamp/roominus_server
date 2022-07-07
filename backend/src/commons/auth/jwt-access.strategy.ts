import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtAccessStreategy extends PassportStrategy(Strategy, 'access') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //
            secretOrKey: process.env.ACCESS_TOKEN_KEY,
        });
    }

    validate(payload) {
        console.log(payload);
        return { email: payload.email, id: payload.sub };
    }
}
