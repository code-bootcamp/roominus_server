import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { JwtAccessStreategy } from 'src/commons/auth/jwt-access.strategy';
import { SocialUserService } from '../socialUser/socialUser.service';
import { AuthResolver } from '../auth/auth.resolver';
import { AuthService } from '../auth/auth.service';

import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

import { User } from './entities/user.entity';
import { Cafe } from '../cafe/entities/cafe.entity';
import { Board } from '../board/entities/board.entity';
import { SocialUser } from '../socialUser/entities/socialUser.entity';

@Module({
    imports: [
        JwtModule.register({}), //
        TypeOrmModule.forFeature([User, Cafe, Board, SocialUser]),
    ],
    providers: [
        JwtAccessStreategy, //
        UserResolver,
        UserService,
        AuthResolver,
        AuthService,
        SocialUserService,
    ],
})
export class UserModule {}
