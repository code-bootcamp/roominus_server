import { ConflictException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenreService {
    constructor(
        @InjectRepository(Genre)
        private readonly genreRepository: Repository<Genre>,
    ) {}

    async findAll() {
        return await this.genreRepository.find({
            order: {
                name: 'ASC',
            },
        });
    }

    async create({ name }) {
        const genre = await this.genreRepository.findOne({ name });
        if (genre) throw new ConflictException('이미 등록된 장르입니다.');

        return await this.genreRepository.save({ name });
    }

    async delete({ genreId }) {
        const result = await this.genreRepository.softDelete({ id: genreId });
        if (result.affected) {
            return true;
        } else {
            throw new ConflictException('삭제를 실패했습니다!!');
        }
    }
}
