import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from '../board/entities/board.entity';
import { Cafe } from '../cafe/entities/cafe.entity';

import { SocialUser } from './entities/socialUser.entity';

@Injectable()
export class SocialUserService {
    constructor(
        @InjectRepository(SocialUser)
        private readonly socialuserRepository: Repository<SocialUser>,

        @InjectRepository(Cafe)
        private readonly cafeRepository: Repository<Cafe>,

        @InjectRepository(Board)
        private readonly boardRepository: Repository<Board>,
    ) {}

    async findsocialUserPhone({ phone }) {
        return await this.socialuserRepository.findOne({ phone });
    }

    async findsocialUserEmail({ email }) {
        return await this.socialuserRepository.findOne({ email });
    }

    async create({ email, phone, name }) {
        const checkUser = await this.socialuserRepository.findOne({ email, phone });
        if (checkUser) throw new ConflictException('이미 등록된 유저입니다.');

        return await this.socialuserRepository.save({ email, phone, name });
    }

    async update(userId, updateSocialUserInput) {
        const result = await this.socialuserRepository.update(
            { id: userId }, //
            { ...updateSocialUserInput },
        );
        if (result.affected) {
            return await this.socialuserRepository.findOne({
                relations: ['cafe', 'board'],
            });
        } else {
            throw new ConflictException('업데이트 실패하였습니다.');
        }
    }

    async delete({ email }) {
        const result = await this.socialuserRepository.softDelete({ email });
        return result.affected ? true : false;
    }
}
