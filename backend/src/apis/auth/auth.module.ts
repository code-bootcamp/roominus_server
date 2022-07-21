import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtRefreshStrategy } from 'src/commons/auth/jwt-refresh.strategy';
import { SocialUserService } from '../socialUser/socialUser.service';
import { CafeService } from '../cafe/cafe.service';
import { UserService } from '../user/user.service';

import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

import { Cafe } from '../cafe/entities/cafe.entity';
import { CafeImg } from '../cafe/entities/cafeImg.entity';
import { SocialUser } from '../socialUser/entities/socialUser.entity';
import { Board } from '../board/entities/board.entity';
import { User } from '../user/entities/user.entity';

@Module({
    imports: [
        JwtModule.register({}), //
        TypeOrmModule.forFeature([User, Cafe, CafeImg, Board, SocialUser]),
    ],
    providers: [
        JwtRefreshStrategy, //
        AuthResolver,
        AuthService,
        UserService,
        CafeService,
        SocialUserService,
    ],
    controllers: [
        AuthController, //
    ],
})
export class AuthModule {}
