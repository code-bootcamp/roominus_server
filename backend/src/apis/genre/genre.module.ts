import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from './entities/genre.entity';
import { GenreResolver } from './genre.resolver';
import { GenreService } from './genre.service';

@Module({
    imports: [TypeOrmModule.forFeature([Genre])],
    providers: [GenreResolver, GenreService],
})
export class GenreModule {}
