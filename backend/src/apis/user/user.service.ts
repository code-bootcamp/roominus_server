import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async findOne({ email }) {
        return await this.userRepository.findOne({ email });
    }

    async create({ email, hashedPassword: password, name, phone }) {
        const user = await this.userRepository.findOne({ email });
        if (user) throw new ConflictException('이미 등록된 유저입니다.');

        return await this.userRepository.save({ email, password, name, phone });
    }

    async delete({ email }) {
        const result = await this.userRepository.softDelete({ email });
        return result.affected ? true : false;
    }
}
