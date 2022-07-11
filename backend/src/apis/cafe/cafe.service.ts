import { ConflictException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { User } from '../user/entities/user.entity';
import { Cafe } from './entities/cafe.entity';
import { CafeImg } from './entities/cafeImg.entity';

@Injectable()
export class CafeService {
    constructor(
        @InjectRepository(Cafe)
        private readonly cafeRepository: Repository<Cafe>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(CafeImg)
        private readonly cafeImgRepository: Repository<CafeImg>,
        private readonly connection: Connection,
    ) {}

    async findAll() {
        const result = await this.cafeRepository.find();

        if (result.length == 0) throw new UnprocessableEntityException('등록된 카페가 없습니다!!');

        return result;
    }

    async findOne({ name }) {
        const result = await this.cafeRepository.findOne({
            where: { name },
        });

        if (!result) throw new UnprocessableEntityException('찾으시는 카페가 없습니다!!');

        return result;
    }

    async create({ createCafeInput }) {
        const { users, mainImg, subImgs, ...cafe } = createCafeInput;
        console.log(createCafeInput);

        const hasCafe = await this.cafeRepository.findOne({ name: cafe.name });
        if (hasCafe) throw new ConflictException('이미 등록된 이름입니다!!');

        const userArr = [];
        for (let i = 0; i < users.length; i++) {
            console.log('==============', users[i]);
            const hasUser = await this.userRepository.findOne({ name: users[i] });
            console.log(hasUser);

            if (hasUser) {
                userArr.push(hasUser);
            } else {
                throw new ConflictException('존재하는 않는 사용자입니다!!');
            }
        }

        const result = await this.cafeRepository.save({
            ...cafe,
            users: userArr,
        });

        await this.cafeImgRepository.save({
            isMain: true,
            url: mainImg,
            cafe: result.id,
        });

        if (subImgs && subImgs.length) {
            for (let i = 0; i < subImgs.length; i++) {
                await this.cafeImgRepository.save({
                    url: subImgs[i],
                    cafe: result.id,
                });
            }
        }

        return result;
    }

    async update({ updateCafeInput }) {
        const { users, mainImg, subImgs, ...cafe } = updateCafeInput;

        const hasCafe = await this.cafeRepository.findOne({ name: cafe.name });
        if (!hasCafe) throw new UnprocessableEntityException('찾으시는 카페가 없습니다!!');

        const result = await this.cafeRepository.update(
            { name: cafe.name }, //
            {
                ...cafe, //
            },
        );

        if (result.affected) {
            return await this.cafeRepository.findOne({ name: cafe.name });
        } else {
            throw new ConflictException('수정을 실패했습니다!!');
        }
    }

    async delete({ name }) {
        const result = await this.cafeRepository.softDelete({ name });

        if (result.affected) {
            return true;
        } else {
            throw new ConflictException('삭제를 실패했습니다!!');
        }
    }
}
