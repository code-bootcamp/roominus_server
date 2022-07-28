import { ConflictException, Injectable, UnprocessableEntityException } from '@nestjs/common';
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

    async create({ userInfo, boardReviewId, createBoardsecondreviewInput }) {
        const { ...items } = createBoardsecondreviewInput;

        const boardsecondreviewresult = await this.boardsecondreviewRepository.save({
            ...items,
            boardreview: boardReviewId,
            user: userInfo.id,
        });

        return await this.boardsecondreviewRepository.findOne({
            where: { id: boardsecondreviewresult.id },
            relations: ['boardreview', 'user'],
        });
    }

    async update({ secondReviewId, userInfo, updateBoardSecondReviewInput }) {
        const { ...boardSecondReview } = updateBoardSecondReviewInput;

        const hasSecondReview = await this.boardsecondreviewRepository.findOne({
            where: { id: secondReviewId },
            relations: ['user'],
        });
        if (hasSecondReview.user.id !== userInfo.id) throw new UnprocessableEntityException('작성자가 아닙니다!');

        const result = await this.boardsecondreviewRepository.update(
            { id: secondReviewId }, //
            { ...boardSecondReview },
        );

        if (result.affected) {
            return await this.boardsecondreviewRepository.findOne({
                where: { id: secondReviewId },
                relations: ['user'],
            });
        } else {
            throw new ConflictException('수정을 실패하였습니다.');
        }
    }

    async delete({ secondReviewId, userInfo }) {
        const hasSecondReview = await this.boardsecondreviewRepository.findOne({
            where: { id: secondReviewId },
            relations: ['user'],
        });
        if (hasSecondReview.user.id !== userInfo.id) throw new UnprocessableEntityException('작성자가 아닙니다!');

        const result = await this.boardsecondreviewRepository.softDelete({
            id: secondReviewId,
        });
        return result.affected ? true : false;
    }
}
