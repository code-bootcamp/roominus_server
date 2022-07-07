import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
    imports: [TypeOrmModule.forFeature([])],
    providers: [
        JwtAccessStrategy,
        UserResolver, //
        UserService,
    ],
})
export class UserModule {}
