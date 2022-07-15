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

    async create({ createBoardsecondreviewInput }) {
        const { boardreview, ...items } = createBoardsecondreviewInput;

        const findBoardreview = await this.boardreviewRepository.findOne({
            where: { id: boardreview },
        });

        console.log(findBoardreview);

        const result = await this.boardsecondreviewRepository.save({
            ...items,
            boardreview: findBoardreview.id,
        });

        await this.boardreviewRepository.save({
            ...findBoardreview,
            boardsecondreview: [result],
        });
        return result;
    }

    async delete({ id }) {
        const result = await this.boardsecondreviewRepository.softDelete({ id });
        return result.affected ? true : false;
    }
}
