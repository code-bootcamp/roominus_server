import { ConflictException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from '../board/entities/board.entity';
import { Boardsecondreview } from '../boardsecondreview/entities/boardsecondreview.entity';
import { User } from '../user/entities/user.entity';
import { Boardreview } from './entities/boardreview.entity';

@Injectable()
export class BoardreviewService {
    constructor(
        @InjectRepository(Boardreview)
        private readonly boardreviewRepository: Repository<Boardreview>,

        @InjectRepository(Boardsecondreview)
        private readonly boardsecondreviewRepository: Repository<Boardsecondreview>,
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

    async findboardreviewcomments({ boardreviewId }) {
        let boardreviewresult = await this.boardreviewRepository.findOne({
            where: [{ id: boardreviewId }],
            relations: ['boardsecondreview', 'user'],
        });

        const pageresult = await this.boardsecondreviewRepository.find({
            where: [{ boardreview: boardreviewId }],
            //     skip: (page - 1) * 10,
            //     take: 10,
            order: { createdAt: 'ASC' },
            relations: ['boardreview', 'user'],
        });

        boardreviewresult.boardsecondreview = pageresult;

        return boardreviewresult;
    }

    async create({ userInfo, createBoardreviewInput }) {
        const { board, ...items } = createBoardreviewInput;

        const boardreviewresult = await this.boardreviewRepository.save({
            ...items,
            board: board,
            user: userInfo.id,
        });
        return await this.boardreviewRepository.findOne({
            where: { id: boardreviewresult.id },
            relations: ['board', 'user'],
        });
    }

    async update({ boardReviewId, updateBoardreviewInput, userInfo }) {
        const hasBoardReview = await this.boardreviewRepository.findOne({
            where: { id: boardReviewId },
            relations: ['user'],
        });
        if (hasBoardReview.user.id !== userInfo.id) throw new UnprocessableEntityException('작성자가 아닙니다!');

        const result = await this.boardreviewRepository.update(
            { id: boardReviewId }, //
            {
                ...updateBoardreviewInput,
            },
        );

        if (result.affected) {
            return await this.boardreviewRepository.findOne({
                where: { id: boardReviewId },
                relations: ['board', 'user'],
            });
        } else {
            throw new ConflictException('수정을 실패하였습니다.');
        }
    }

    async delete({ boardReviewId, userInfo }) {
        const hasBoardReview = await this.boardreviewRepository.findOne({
            where: { id: boardReviewId },
            relations: ['user'],
        });
        if (hasBoardReview.user.id !== userInfo.id) throw new UnprocessableEntityException('작성자가 아닙니다!');

        const result = await this.boardreviewRepository.softDelete({ id: boardReviewId });
        return result.affected ? true : false;
    }
}
