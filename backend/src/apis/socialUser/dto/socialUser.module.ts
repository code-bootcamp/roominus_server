import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialUser } from '../entities/socialUser.entity';
import { SocialUserResolver } from './socialUser.resolver';
import { SocialUserService } from './socialUser.service';

@Module({
    imports: [
        JwtModule.register({}), //
        TypeOrmModule.forFeature([SocialUser]),
    ],
    providers: [
        SocialUserResolver, //
        SocialUserService,
    ],
})
export class SocialUserModule {}
