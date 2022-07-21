import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { ThemeResolver } from './theme.resolver';
import { ThemeService } from './theme.service';

import { Genre } from '../genre/entities/genre.entity';
import { ThemeImg } from './entities/themeImg.entity';
import { Cafe } from '../cafe/entities/cafe.entity';
import { Like } from '../user/entities/like.entity';
import { Theme } from './entities/theme.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Theme, ThemeImg, Cafe, Genre, Like])],
    providers: [ThemeResolver, ThemeService],
})
export class ThemeModule {}
