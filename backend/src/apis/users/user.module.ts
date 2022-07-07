import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { JwtAccessStreategy } from 'src/commons/auth/jwt-access.strategy';

@Module({
    imports: [TypeOrmModule.forFeature([])],
    providers: [
        JwtAccessStreategy,
        UserResolver, //
        UserService,
    ],
})
export class UserModule {}
