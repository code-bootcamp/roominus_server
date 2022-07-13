import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ThemeMenuResolver } from './themeMenu.resolver';
import { ThemeMenuService } from './themeMenu.service';

import { Cafe } from '../cafe/entities/cafe.entity';
import { Theme } from '../theme/entities/theme.entity';
import { ThemeMenu } from './entities/themeMenu.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ThemeMenu, Cafe, Theme])],
    providers: [ThemeMenuResolver, ThemeMenuService],
})
export class ThemeMenuModule {}
