import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService, //
        private readonly userService: UserService,
    ) {}

    setRefreshToken({ user, res }) {
        const refreshToken = this.jwtService.sign(
            { email: user.email, sub: user.id },
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

    getAccessToken({ user }) {
        return this.jwtService.sign(
            {
                email: user.email, //
            },
            { secret: process.env.ACCESS_TOKEN_KEY, expiresIn: '1h' },
        );
    }
}
