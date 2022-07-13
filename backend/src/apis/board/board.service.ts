import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardTag } from '../boardTag/entities/boardTag.entity';
import { Cafe } from '../cafe/entities/cafe.entity';
import { Theme } from '../theme/entities/theme.entity';
import { User } from '../user/entities/user.entity';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(Board)
        private readonly boardRepository: Repository<Board>,

        @InjectRepository(Cafe)
        private readonly cafeRepository: Repository<Cafe>,

        @InjectRepository(Theme)
        private readonly themeRepository: Repository<Theme>,

        @InjectRepository(User)
        private readonly UserRepository: Repository<User>,

        @InjectRepository(BoardTag)
        private readonly boardTagRepository: Repository<BoardTag>,
    ) {}

    async FindAll() {
        return await this.boardRepository.find({
            relations: ['cafe', 'theme', 'user', 'boardTags'],
            order: { createAt: 'DESC' },
        });
    }

    async findOne({ id }) {
        return await this.boardRepository.findOne({
            where: { id },
            relations: ['cafe', 'theme', 'user', 'boardTags'],
        });
    }

    async create({ createBoardInput }) {
        const { cafeId, themeId, userId, boardTags, ...board } = createBoardInput;

        const hasBoard = await this.boardRepository.findOne({ title: board.title });
        if (hasBoard) throw new ConflictException('이미 등록된 게시물입니다!!');

        // const result = await this.boardRepository.save({ ...board });
        const result2 = [];
        for (let i = 0; i < boardTags.length; i++) {
            const tagtitle = boardTags[i].replace('#', '');
            const prevTag = await this.boardTagRepository.findOne({ title: tagtitle });

            if (prevTag) {
                result2.push(prevTag);
            } else {
                const newTag = await this.boardTagRepository.save({ title: tagtitle });
                result2.push(newTag);
            }
        }

        const result3 = await this.boardRepository.save({
            ...board,
            cafe: { id: cafeId },
            theme: { id: themeId },
            user: { id: userId },
            boardTags: result2,
        });
        return result3;
    }

    async update({ updateBoardInput }) {
        const { boardTags, content, like, view, ...board } = updateBoardInput;
        const checkboard1 = await this.boardRepository.findOne({ title: board.title });
        console.log(checkboard1);
        if (!checkboard1) {
            throw new ConflictException('기존 게시물이 없습니다.');
        }
        const checkboard2 = await this.boardRepository.findOne({ title: board.title, content, like, view, boardTags });
        if (checkboard2) throw new ConflictException('이미 수정 완료한 게시물입니다.');

        await this.boardRepository.delete({ title: board.title, content, like, view });
        const myboard = await this.boardRepository.findOne({
            where: { title: board.title, content, like, view, boardTags },
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
