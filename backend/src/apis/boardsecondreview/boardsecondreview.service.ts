import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Boardsecondreview } from './entities/boardsecondreview.entity';

@Injectable()
export class BoardsecondreviewService {
    constructor(
        @InjectRepository(Boardsecondreview)
        private readonly boardsecondreviewRepository: Repository<Boardsecondreview>,
    ) {}

    async FindAll() {
        return await this.boardsecondreviewRepository.find({
            relations: [],
            order: { createAt: 'DESC' },
        });
    }

    async findOne({ id }) {
        return await this.boardsecondreviewRepository.findOne({
            where: { id },
            relations: [],
        });
    }

    async create({ id, content }) {
        return await this.boardsecondreviewRepository.save({ id, content });
    }

    async delete({ id }) {
        const result = await this.boardsecondreviewRepository.softDelete({ id });
        return result.affected ? true : false;
    }
}
