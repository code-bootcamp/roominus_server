import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from '../board/entities/board.entity';
import { User } from '../user/entities/user.entity';
import { Boardreview } from './entities/boardreview.entity';

@Injectable()
export class BoardreviewService {
    constructor(
        @InjectRepository(Boardreview)
        private readonly boardreviewRepository: Repository<Boardreview>,
    ) {}
    async FindAll() {
        return await this.boardreviewRepository.find({
            relations: ['board', 'user'],
            order: { createAt: 'DESC' },
        });
    }

    async findOne({ id }) {
        return await this.boardreviewRepository.findOne({
            where: { id },
            relations: ['board', 'user'],
        });
    }

    async create({ id, content }) {
        return await this.boardreviewRepository.save({ id, content });
    }

    async delete({ id }) {
        const result = await this.boardreviewRepository.softDelete({ id });
        return result.affected ? true : false;
    }
}
