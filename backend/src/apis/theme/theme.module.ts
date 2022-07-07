import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ThemeResolver } from './theme.resolver';
import { ThemeServie } from './theme.service';

import { Theme } from './entities/theme.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Theme])],
    providers: [ThemeResolver, ThemeServie],
})
export class ThemeModule {}
