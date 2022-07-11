import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ThemeResolver } from './theme.resolver';
import { ThemeServie } from './theme.service';

import { Theme } from './entities/theme.entity';
import { ThemeImg } from './entities/themeImg.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Theme, ThemeImg])],
    providers: [ThemeResolver, ThemeServie],
})
export class ThemeModule {}
