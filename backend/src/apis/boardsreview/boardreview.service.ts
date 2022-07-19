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

        @InjectRepository(Board)
        private readonly boardRepository: Repository<Board>,
    ) {}
    async FindAll() {
        return await this.boardreviewRepository.find({
            relations: ['board'],
            order: { createdAt: 'DESC' },
        });
    }

    async findOne({ id }) {
        return await this.boardreviewRepository.findOne({
            where: { id },
            relations: ['board', 'boardsecondreview'],
        });
    }

    async create({ createBoardreviewInput }) {
        const { board, ...items } = createBoardreviewInput;

        const findBoard = await this.boardRepository.findOne({
            where: { id: board },
        });

        const boardreviewresult = await this.boardreviewRepository.save({
            ...items,
            board: findBoard,
        });

        return boardreviewresult;
    }

    async delete({ id }) {
        const result = await this.boardreviewRepository.softDelete({ id });
        return result.affected ? true : false;
    }
}
