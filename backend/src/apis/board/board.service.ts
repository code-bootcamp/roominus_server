import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardTag } from '../boardTag/entities/boardTag.entity';
import { User } from '../user/entities/user.entity';
import { Board } from './entities/board.entity';
import { BoardImg } from './entities/boardImg.entity';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(Board)
        private readonly boardRepository: Repository<Board>,

        @InjectRepository(BoardTag)
        private readonly boardTagRepository: Repository<BoardTag>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(BoardImg)
        private readonly boardImgRepository: Repository<BoardImg>,
    ) {}

    async findAll() {
        return await this.boardRepository.find({
            relations: ['boardTags'],
            order: { createdAt: 'DESC' },
        });
    }

    async findOne({ id }) {
        const result = await this.boardRepository.findOne({
            where: { id },
            relations: ['boardTags', 'user'],
        });

        return result;
    }
    async create({ createBoardInput }) {
        //게시물 중복여부 확인(안해도 됨)
        // const checkBoard = await this.boardRepository.findOne({ id: createBoardInput.id });
        // if (checkBoard) throw new ConflictException('이미 등록된 게시물입니다.');
        const { user, ...items } = createBoardInput;
        const findUser = await this.userRepository.findOne({
            where: { id: user },
        });

        const result = await this.boardRepository.save({
            ...items,
            user: findUser.id,
        });

        await this.userRepository.save({
            ...findUser,
            board: [result],
        });

        return result;
    }
    /////

    async update({ updateBoardInput }) {
        const { boardTags, content, like, view, mainImg, ...board } = updateBoardInput;
        const checkboard1 = await this.boardRepository.findOne({ title: board.title });
        console.log(checkboard1);
        if (!checkboard1) {
            throw new ConflictException('기존 게시물이 없습니다.');
        }
        const checkboard2 = await this.boardRepository.findOne({ title: board.title, content, like, view, boardTags });
        if (checkboard2) throw new ConflictException('이미 수정 완료한 게시물입니다.');

        await this.boardRepository.delete({ title: board.title, content, like, view });
        const myboard = await this.boardRepository.findOne({
            where: { title: board.title, content, like, view, mainImg, boardTags },
            relations: ['boardTags'],
        });

        // const myboard = await this.boardRepository.update({ title: board.title }, { ...boardTags });
        // const newboard = {
        //     ...myboard,
        //     title: board.title,
        //     boardTags,
        //     ...updateBoardInput,
        // };
        // return await this.boardRepository.save(newboard);
    }

    // const result = await this.boardRepository.update(
    //     { title: board.title }, //
    //     { ...board },
    // );

    // if (result.affected) {
    //     return await this.boardRepository.findOne({ title: board.title });
    // } else {
    //     throw new ConflictException('수정을 실패했습니다.');
    // }
    async delete({ title }) {
        const check = await this.boardRepository.softDelete({ title });
        if (check.affected) {
            return true;
        } else {
            throw new ConflictException('삭제 실패하였습니다.');
        }
    }
}
