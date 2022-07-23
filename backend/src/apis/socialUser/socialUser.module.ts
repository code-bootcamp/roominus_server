import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { SocialUserResolver } from './socialUser.resolver';
import { SocialUserService } from './socialUser.service';

import { SocialUser } from './entities/socialUser.entity';
import { Cafe } from '../cafe/entities/cafe.entity';
import { Board } from '../board/entities/board.entity';

@Module({
    imports: [
        JwtModule.register({}), //
        TypeOrmModule.forFeature([SocialUser, Cafe, Board]),
    ],
    providers: [
        SocialUserResolver, //
        SocialUserService,
    ],
})
export class SocialUserModule {}
