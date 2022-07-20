import { ConflictException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Boardreview } from '../boardsreview/entities/boardreview.entity';
import { BoardTag } from '../boardTag/entities/boardTag.entity';
import { User } from '../user/entities/user.entity';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(Board)
        private readonly boardRepository: Repository<Board>,

        @InjectRepository(BoardTag)
        private readonly boardTagRepository: Repository<BoardTag>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(Boardreview)
        private readonly boardReviewRepository: Repository<Boardreview>,
    ) {}

    async findAll() {
        const aaa = await this.boardRepository.find({
            relations: ['boardTags', 'user'],
            order: { createdAt: 'DESC' },
        });

        return aaa;
    }

    async findOne({ id }) {
        const result = await this.boardRepository.findOne({
            where: [{ id }],
            relations: ['boardTags', 'user', 'boardreview'],
        });

        return result;
    }

    async findboardcomments({ page, boardId }) {
        let boardresult = await this.boardRepository.findOne({
            where: [{ id: boardId }],
            relations: ['boardreview'],
        });

        const pageresult = await this.boardReviewRepository.find({
            where: [{ board: boardId }],
            skip: (page - 1) * 10,
            take: 10,
            order: { createdAt: 'DESC' },
        });

        boardresult.boardreview = pageresult;

        return boardresult;
    }

    async findwithUser({ userInfo }) {
        const result = await this.boardRepository.find({
            where: { user: userInfo.id },
            relations: ['boardreview', 'boardTags', 'user'],
            order: { createdAt: 'DESC' },
        });

        if (result.length == 0) throw new UnprocessableEntityException('작성하신 글이 없습니다!!');

        return result;
    }

    async create({ userInfo, createBoardInput }) {
        const { boardTags, ...items } = createBoardInput;
        const findUser = await this.userRepository.findOne({
            where: { id: userInfo.id },
        });

        const boardTagresult = [];
        for (let i = 0; i < boardTags.length; i++) {
            const tagtitle = boardTags[i].replace('#', '');
            const prevTag = await this.boardTagRepository.findOne({ title: tagtitle });

            if (prevTag) {
                boardTagresult.push(prevTag);
            } else {
                const newTag = await this.boardTagRepository.save({ title: tagtitle });
                boardTagresult.push(newTag);
            }
        }

        const boardResult = await this.boardRepository.save({
            ...items,
            user: userInfo.id,
            boardTags: boardTagresult,
        });

        return await this.boardRepository.findOne({
            where: { id: boardResult.id },
            relations: ['boardreview', 'boardTags', 'user'],
        });
    }

    async update({ userInfo, boardId, updateBoardInput }) {
        const hasBoard = await this.boardRepository.findOne({
            where: { id: boardId },
            relations: ['user'],
        });
        if (hasBoard.user.id !== userInfo.id) throw new UnprocessableEntityException('작성자가 아닙니다!');

        const result = await this.boardRepository.update(
            { id: boardId }, //
            { ...updateBoardInput },
        );
        if (result.affected) {
            return await this.boardRepository.findOne({
                where: { id: boardId },
                relations: ['boardreview', 'boardTags', 'user'],
            });
        } else {
            throw new ConflictException('수정을 실패했습니다.');
        }
    }

    async delete({ userInfo, boardId }) {
        const hasBoard = await this.boardRepository.findOne({
            where: { id: boardId },
            relations: ['user'],
        });
        if (hasBoard.user.id !== userInfo.id) throw new UnprocessableEntityException('작성자가 아닙니다!');

        const check = await this.boardRepository.softDelete({ id: boardId });
        if (check.affected) {
            return true;
        } else {
            throw new ConflictException('삭제 실패하였습니다.');
        }
    }
}
