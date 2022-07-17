import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneResolver } from './phone.resolver';
import { PhoneService } from './phone.service';

@Module({
    providers: [PhoneResolver, PhoneService],
})
export class PhoneModule {}
