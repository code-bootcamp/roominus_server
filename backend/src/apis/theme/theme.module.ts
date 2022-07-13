import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ThemeResolver } from './theme.resolver';
import { ThemeService } from './theme.service';

import { Theme } from './entities/theme.entity';
import { ThemeImg } from './entities/themeImg.entity';
import { Cafe } from '../cafe/entities/cafe.entity';
import { Genre } from '../genre/entities/genre.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Theme, ThemeImg, Cafe, Genre])],
    providers: [ThemeResolver, ThemeService],
})
export class ThemeModule {}
