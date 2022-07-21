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

    async findsocialUserPhone({ phone }) {
        return await this.socialuserRepository.findOne({ phone });
    }

    async findsocialUserEmail({ email }) {
        return await this.socialuserRepository.findOne({ email });
    }

    async create({ email, phone }) {
        const checkUser = await this.socialuserRepository.findOne({ email, phone });
        if (checkUser) throw new ConflictException('이미 등록된 유저입니다.');

        return await this.socialuserRepository.save({ email });
    }
}
