import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { GenreResolver } from './genre.resolver';
import { GenreService } from './genre.service';

import { Genre } from './entities/genre.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Genre])],
    providers: [GenreResolver, GenreService],
})
export class GenreModule {}
