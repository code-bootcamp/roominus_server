import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FragmentsOnCompositeTypesRule } from 'graphql';
import { Repository } from 'typeorm';
import { Board } from '../board/entities/board.entity';
import { Cafe } from '../cafe/entities/cafe.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(Cafe)
        private readonly cafeRepository: Repository<Cafe>,

        @InjectRepository(Board)
        private readonly boardRepository: Repository<Board>,
    ) {}

    async findAll() {
        return await this.userRepository.find();
    }

    async findOne({ email }) {
        const aaa = await this.userRepository.findOne({ email });
        return aaa;
    }

    async findPassword({ email, phone }) {
        const aaa = await this.userRepository.findOne({ email, phone });
        return aaa;
    }

    async create({ createUserInput, hashedPassword }) {
        const { name, ...items } = createUserInput;
        const maskingname = name.replace(name[name.length - 2], '*');

        const checkuser = await this.userRepository.findOne({ email: createUserInput.email });
        if (checkuser) throw new ConflictException('이미 등록된 유저입니다.');

        const result = await this.userRepository.save({
            ...items,
            password: hashedPassword,
            name: maskingname,
        });
        return result;
    }

    async update({ hashedPassword, updateUserInput }) {
        const { password, ...items } = updateUserInput;
        const result = await this.userRepository.update(
            { ...updateUserInput }, //
            { password: hashedPassword },
        );
        if (result.affected) {
            return await this.userRepository.findOne({
                relations: ['cafe', 'board'],
            });
        } else {
            throw new ConflictException('삭제 실패하였습니다.');
        }
    }

    async delete({ email }) {
        const result = await this.userRepository.softDelete({ email });
        return result.affected ? true : false;
    }

    async updateStatus({ email }) {
        await this.userRepository.update(
            { email }, //
            { isserviceprovider: true },
        );
        return true;
    }
}
