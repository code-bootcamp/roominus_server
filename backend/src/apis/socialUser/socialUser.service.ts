import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SocialUser } from './entities/socialUser.entity';

@Injectable()
export class SocialUserService {
    constructor(
        @InjectRepository(SocialUser)
        private readonly socialuserRepository: Repository<SocialUser>,
    ) {}

    async findOne({ email }) {
        return await this.socialuserRepository.find({ email });
    }

    async create({ email }) {
        const checkUser = await this.socialuserRepository.findOne({ email });
        if (checkUser) throw new ConflictException('이미 등록된 유저입니다.');

        return await this.socialuserRepository.save({ email });
    }
}
