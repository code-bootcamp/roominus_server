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

        @InjectRepository(Board)
        private readonly userRepository: Repository<User>,
    ) {}
    async FindAll() {
        return await this.boardreviewRepository.find({
            relations: ['board', 'user'],
            order: { createdAt: 'DESC' },
        });
    }

    async findOne({ id }) {
        return await this.boardreviewRepository.findOne({
            where: { id },
            relations: ['board', 'boardsecondreview', 'user '],
        });
    }

    async create({ createBoardreviewInput }) {
        const { board, user, ...items } = createBoardreviewInput;

        const findBoard = await this.boardRepository.findOne({
            where: { id: board },
        });

        const findUser = await this.userRepository.findOne({
            where: { id: user },
        });

        const boardreviewresult = await this.boardreviewRepository.save({
            ...items,
            board: findBoard,
            user: findUser,
        });

        return boardreviewresult;
    }

    async update(boardreviewId, updateBoardReviewInput) {
        const result = await this.boardreviewRepository.update(
            { id: boardreviewId }, //
            {
                ...updateBoardReviewInput,
            },
        );

        if (result.affected) {
            return await this.boardreviewRepository.findOne({
                where: { id: boardreviewId },
                relations: ['board', 'user'],
            });
        } else {
            throw new ConflictException('수정을 실패하였습니다.');
        }
    }

    async delete({ id }) {
        const result = await this.boardreviewRepository.softDelete({ id });
        return result.affected ? true : false;
    }
}
