import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardTag } from '../boardTag/entities/boardTag.entity';
import { Board } from './entities/board.entity';
import { BoardImg } from './entities/boardImg.entity';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(Board)
        private readonly boardRepository: Repository<Board>,

        @InjectRepository(BoardTag)
        private readonly boardTagRepository: Repository<BoardTag>,

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
        return await this.boardRepository.findOne({
            where: { id },
            relations: ['boardTags'],
        });
    }
    async create({ createBoardInput }) {
        const { boardImg, boardTags, ...board } = createBoardInput;

        // const hasCafe = await this.cafeRepository.findOne({ name: cafeName });

        // const hasTheme = await this.themeRepository.findOne({ title: themeTitle });

        // const hasUser = await this.UserRepository.findOne({ name: userName });

        const hasBoard = await this.boardRepository.findOne({ title: board.title });

        // const hasBoardTags = await this.boardTagRepository.findOne({ title: boardTags.title });
        // console.log('-----------');
        // console.log(hasBoardTags);
        // console.log('-----------');

        if (hasBoard) throw new ConflictException('이미 등록된 게시글입니다.');

        const result = [];
        for (let i = 0; i < boardTags.length; i++) {
            const tagtitle = boardTags[i].replace('#', '');
            const prevTag = await this.boardTagRepository.findOne({ title: tagtitle });

            if (prevTag) {
                result.push(prevTag);
            } else {
                const newTag = await this.boardTagRepository.save({ title: tagtitle });
                result.push(newTag);
            }
        }

        const newBoard = await this.boardRepository.save({
            ...board,
            boardImg: boardImg,
            boardTags: result,
        });

        const result2 = await this.boardRepository.findOne({
            where: { id: newBoard.id },
            relations: ['boardTags'],
        });

        return result2;
    }
    /////
    // async create({ createBoardInput }) {
    //     const { cafeId, themeId, userId, boardTags, ...board } = createBoardInput;

    //     const hasBoard = await this.boardRepository.findOne({ title: board.title });
    //     if (hasBoard) throw new ConflictException('이미 등록된 게시물입니다!!');

    //     // const result = await this.boardRepository.save({ ...board });
    //     const result2 = [];
    //     for (let i = 0; i < boardTags.length; i++) {
    //         const tagtitle = boardTags[i].replace('#', '');
    //         const prevTag = await this.boardTagRepository.findOne({ title: tagtitle });

    //         if (prevTag) {
    //             result2.push(prevTag);
    //         } else {
    //             const newTag = await this.boardTagRepository.save({ title: tagtitle });
    //             result2.push(newTag);
    //         }
    //     }

    //     const result3 = await this.boardRepository.save({
    //         ...board,
    //         cafe: { id: cafeId },
    //         theme: { id: themeId },
    //         user: { id: userId },
    //         boardTags: result2,
    //     });
    //     return result3;
    // }
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
