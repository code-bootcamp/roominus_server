import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cafe } from '../cafe/entities/cafe.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(Cafe)
        private readonly cafeRepository: Repository<Cafe>,
    ) {}

    async findAll() {
        return await this.userRepository.find();
    }

    async findOne({ email }) {
        return await this.userRepository.findOne({ email });
    }

    async create({ createUserInput, hashedPassword }) {
        const { ...user } = createUserInput;

        console.log('-------------------');
        console.log(createUserInput);
        console.log('-------------------');
        const result1 = await this.cafeRepository.findOne({});

        console.log('-------------------');
        console.log(result1);
        console.log('-------------------');

        // const bbb = await this.userRepository.findOne({password: user.password})
        const aaa = await this.userRepository.findOne({ email: user.email });
        if (aaa) throw new ConflictException('이미 등록된 유저입니다.');
        const result2 = await this.userRepository.save({
            ...user,
            cafe: result1,
            password: hashedPassword,
        });
        console.log(result2);
        return result2;
    }

    async delete({ email }) {
        const result = await this.userRepository.softDelete({ email });
        return result.affected ? true : false;
    }
}
