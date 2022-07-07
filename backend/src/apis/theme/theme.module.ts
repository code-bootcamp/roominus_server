import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Theme } from './entities/theme.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Theme])],
    providers: [],
})
export class ThemeModule {}
