import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Boardreview } from '../boardsreview/entities/boardreview.entity';
import { Boardsecondreview } from './entities/boardsecondreview.entity';

@Injectable()
export class BoardsecondreviewService {
    constructor(
        @InjectRepository(Boardreview)
        private readonly boardreviewRepository: Repository<Boardreview>,
        @InjectRepository(Boardsecondreview)
        private readonly boardsecondreviewRepository: Repository<Boardsecondreview>,
    ) {}

    async FindAll() {
        return await this.boardsecondreviewRepository.find({
            relations: ['boardreview'],
            order: { createdAt: 'DESC' },
        });
    }

    async findOne({ id }) {
        return await this.boardsecondreviewRepository.findOne({
            where: { id },
            relations: ['boardreview'],
        });
    }

    async create({ content, boardreviewId }) {
        const hasBoardsecondreview = await this.boardreviewRepository.findOne({ id: boardreviewId });
        const newBoardsecondreview = await this.boardsecondreviewRepository.save({
            relations: ['boardreview'],
            content,
            boardreview: hasBoardsecondreview.id,
        });

        return newBoardsecondreview;
    }

    async delete({ id }) {
        const result = await this.boardsecondreviewRepository.softDelete({ id });
        return result.affected ? true : false;
    }
}
