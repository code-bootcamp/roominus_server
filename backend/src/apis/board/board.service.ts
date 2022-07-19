import { ConflictException, Injectable } from '@nestjs/common';
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

    async create({ createBoardInput }) {
        //게시물 중복여부 확인(안해도 됨)
        // const checkBoard = await this.boardRepository.findOne({ id: createBoardInput.id });
        // if (checkBoard) throw new ConflictException('이미 등록된 게시물입니다.');
        const { user, boardTags, ...items } = createBoardInput;
        const findUser = await this.userRepository.findOne({
            where: { id: user },
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
        const boardresult = await this.boardRepository.save({
            ...items,
            user: findUser,
            boardTags: boardTagresult,
        });

        const userresult = await this.userRepository.save({
            ...findUser,
            board: [boardresult.id],
            user: [boardresult.user],
            // boardTags: boardTagresult,
        });

        const finalresult = await this.boardRepository.save({
            ...boardresult,
            user: userresult,
        });
        console.log(finalresult);
        return finalresult;
    }
    /////

    async update({ boardId, updateBoardInput }) {
        const result = await this.boardRepository.update(
            { id: boardId }, //
            { ...updateBoardInput },
        );
        if (result.affected) {
            return await this.boardRepository.findOne({ id: boardId });
        } else {
            throw new ConflictException('수정을 실패했습니다.');
        }

        // const { boardTags, content, like, view, mainImg, ...board } = updateBoardInput;
        // const checkboard1 = await this.boardRepository.findOne({ title: board.title });
        // if (!checkboard1) {
        //     throw new ConflictException('기존 게시물이 없습니다.');
        // }
        // const checkboard2 = await this.boardRepository.findOne({ title: board.title, content, like, view, boardTags });
        // if (checkboard2) throw new ConflictException('이미 수정 완료한 게시물입니다.');
        // await this.boardRepository.delete({ title: board.title, content, like, view });
        // const myboard = await this.boardRepository.findOne({
        //     where: { title: board.title, content, like, view, mainImg, boardTags },
        //     relations: ['boardTags', 'user'],
        // });
    }

    async delete({ title }) {
        const check = await this.boardRepository.softDelete({ title });
        if (check.affected) {
            return true;
        } else {
            throw new ConflictException('삭제 실패하였습니다.');
        }
    }
}
