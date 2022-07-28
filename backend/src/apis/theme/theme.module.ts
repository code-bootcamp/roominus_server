import { ElasticsearchModule } from '@nestjs/elasticsearch';
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
    imports: [
        TypeOrmModule.forFeature([Theme, ThemeImg, Cafe, Genre, Like]),
        // ElasticsearchModule.register({
        //     node: 'https://search-roominus-elastic-ox2lc66yg5ewdkjr2l3vmkptje.us-west-2.es.amazonaws.com:443',
        //     auth: {
        //         username: '',
        //         password: '',
        //     },
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        // }),
    ],
    providers: [ThemeResolver, ThemeService],
})
export class ThemeModule {}
