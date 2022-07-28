import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { ThemeMenuResolver } from './themeMenu.resolver';
import { ThemeMenuService } from './themeMenu.service';

import { ThemeMenu } from './entities/themeMenu.entity';
import { Theme } from '../theme/entities/theme.entity';
import { Cafe } from '../cafe/entities/cafe.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ThemeMenu, Cafe, Theme])],
    providers: [ThemeMenuResolver, ThemeMenuService],
})
export class ThemeMenuModule {}
