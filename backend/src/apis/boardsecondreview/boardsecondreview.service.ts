import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Boardreview } from '../boardsreview/entities/boardreview.entity';
import { User } from '../user/entities/user.entity';
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

    async create({ userInfo, createBoardsecondreviewInput }) {
        const { boardreview, ...items } = createBoardsecondreviewInput;

        const boardsecondreviewresult = await this.boardsecondreviewRepository.save({
            ...items,
            boardreview: boardreview,
            user: userInfo.id,
        });

        return await this.boardsecondreviewRepository.findOne({
            where: { id: boardsecondreviewresult.id },
            relations: ['boardreview', 'user'],
        });
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
