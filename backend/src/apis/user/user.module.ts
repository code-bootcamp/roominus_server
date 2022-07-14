import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { JwtAccessStreategy } from 'src/commons/auth/jwt-access.strategy';
import { User } from './entities/user.entity';
import { Cafe } from '../cafe/entities/cafe.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Cafe])],
    providers: [
        JwtAccessStreategy,
        UserResolver, //
        UserService,
    ],
})
export class UserModule {}
