import { ConflictException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Boardreview } from '../boardsreview/entities/boardreview.entity';
import { BoardTag } from '../boardTag/entities/boardTag.entity';
import { BoardLike } from './entities/boardLike.entity';
import { User } from '../user/entities/user.entity';
import { Board } from './entities/board.entity';
import { SocialUser } from '../socialUser/entities/socialUser.entity';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(SocialUser)
        private readonly socialuserRepository: Repository<SocialUser>,

        @InjectRepository(Board)
        private readonly boardRepository: Repository<Board>,
        @InjectRepository(BoardTag)
        private readonly boardTagRepository: Repository<BoardTag>,
        @InjectRepository(BoardLike)
        private readonly boardLikeRepository: Repository<BoardLike>,
        @InjectRepository(Boardreview)
        private readonly boardReviewRepository: Repository<Boardreview>,
    ) {}

    async findAll({ page }) {
        const aaa = await this.boardRepository.find({
            relations: ['boardTags', 'user'],
            order: { createdAt: 'DESC' },
            skip: (page - 1) * 8,
            take: 8,
        });

        return aaa;
    }

    async findAllCount() {
        return await this.boardRepository.count();
    }

    async findOne({ id }) {
        const result = await this.boardRepository.findOne({
            where: [{ id }],
            relations: ['boardTags', 'user', 'boardreview', 'likeUsers'],
        });

        if (!result) throw new UnprocessableEntityException('찾으시는 글이 없습니다!!');

        return result;
    }

    async findboardcomments({ boardId }) {
        const boardresult = await this.boardRepository.findOne({
            where: [{ id: boardId }],
            relations: ['boardreview', 'user'],
        });

        const pageresult = await this.boardReviewRepository.find({
            where: [{ board: boardId }],
            //     skip: (page - 1) * 10,
            //     take: 10,
            order: { createdAt: 'ASC' },
            relations: ['user'],
        });

        boardresult.boardreview = pageresult;

        return boardresult;
    }

    async findwithUser({ userInfo, page }) {
        const result = await this.boardRepository.find({
            where: { user: userInfo.id },
            relations: ['boardreview', 'boardTags', 'user'],
            skip: (page - 1) * 10,
            take: 10,
            order: { createdAt: 'DESC' },
        });

        if (result.length == 0) throw new UnprocessableEntityException('작성하신 글이 없습니다!!');

        return result;
    }

    async findUserCount({ userInfo }) {
        return await this.boardRepository.count({
            where: { user: userInfo.id },
        });
    }

    async findUserLikeList({ page, userInfo }) {
        const result = await this.boardLikeRepository.find({
            where: { userId: userInfo.id },
            relations: ['board'],
            take: 8,
            skip: (page - 1) * 8,
            order: { createdAt: 'DESC' },
        });

        if (result.length == 0) throw new UnprocessableEntityException('찜한 글이 없습니다!!');

        return result;
    }

    async findUserLikeListCount({ userInfo }) {
        return await this.boardLikeRepository.count({
            userId: userInfo.id,
        });
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
            user: findUser,
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
            relations: ['user', 'boardTags'],
        });

        console.log('---------------------');
        console.log(hasBoard);
        console.log('---------------------');

        if (hasBoard.user.id !== userInfo.id) throw new UnprocessableEntityException('작성자가 아닙니다!');
        const result = await this.boardRepository.update(
            { id: boardId }, //
            { ...updateBoardInput },
        );
        console.log('---------------------');
        console.log(result);
        console.log('---------------------');

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

    async createLike({ boardId, userInfo }) {
        const hasLike = await this.boardLikeRepository.findOne({
            where: { boardId, userId: userInfo.id },
        });

        if (hasLike) {
            await this.boardLikeRepository.delete({
                boardId,
                userId: userInfo.id,
            });

            const board = await this.boardRepository.findOne({ id: boardId });
            await this.boardRepository.update(
                { id: boardId }, //
                { like: board.like - 1 },
            );

            return false;
        }

        await this.boardLikeRepository.save({
            boardId,
            userId: userInfo.id,
        });

        const board = await this.boardRepository.findOne({ id: boardId });
        await this.boardRepository.update(
            { id: boardId }, //
            { like: board.like + 1 },
        );

        return true;
    }
}
