import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CafeResolver } from './cafe.resolver';
import { CafeService } from './cafe.service';

import { Cafe } from './entities/cafe.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Cafe])],
    providers: [CafeResolver, CafeService],
})
export class CafeModule {}
