import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { title } from 'process';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(Board)
        private readonly boardRepository: Repository<Board>,
    ) {}

    async findOne({ title }) {
        return await this.boardRepository.findOne({ title });
    }

    async create({ createBoardInput }) {
        const { ...board } = createBoardInput;

        const hasBoard = await this.boardRepository.findOne({ title: board.title });
        if (hasBoard) throw new ConflictException('이미 등록된 게시물입니다!!');

        const result = await this.boardRepository.save({ ...board });
        return result;
    }

    async update({ updateBoardInput }) {
        const { ...board } = updateBoardInput;

        const result = await this.boardRepository.update(
            { title: board.title }, //
            { ...board },
        );

        if (result.affected) {
            return await this.boardRepository.findOne({ title: board.title });
        } else {
            throw new ConflictException('수정을 실패했습니다.');
        }
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
