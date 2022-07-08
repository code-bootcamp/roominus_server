import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CafeResolver } from './cafe.resolver';
import { CafeService } from './cafe.service';

import { User } from '../user/entities/user.entity';
import { Cafe } from './entities/cafe.entity';
import { CafeImg } from './entities/cafeImg.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Cafe, User, CafeImg])],
    providers: [CafeResolver, CafeService],
})
export class CafeModule {}
