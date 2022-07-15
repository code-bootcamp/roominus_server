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
        return await this.userRepository.findOne({ email });
    }

    async create({ createUserInput, hashedPassword }) {
        const checkuser = await this.userRepository.findOne({ email: createUserInput.email });
        if (checkuser) throw new ConflictException('이미 등록된 유저입니다.');

        const result = await this.userRepository.save({
            ...createUserInput,
            password: hashedPassword,
        });
        return result;
        // const result1 = await this.cafeRepository.save({

        // });
        // console.log('--------');
        // console.log(result1);
        // console.log('--------');
        // // const bbb = await this.userRepository.findOne({password: user.password})
        // const aaa = await this.userRepository.findOne({ email: user.email });
        // if (aaa) throw new ConflictException('이미 등록된 유저입니다.');
        // const result2 = await this.userRepository.save({
        //     ...user,
        //     cafe: result1,
        //     password: hashedPassword,
        // });
        // return result2;
    }

    async delete({ email }) {
        const result = await this.userRepository.softDelete({ email });
        return result.affected ? true : false;
    }
}
