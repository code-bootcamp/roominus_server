import { ConflictException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cafe } from './entities/cafe.entity';

@Injectable()
export class CafeService {
    constructor(
        @InjectRepository(Cafe)
        private readonly cafeRepository: Repository<Cafe>,
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
        const { ...cafe } = createCafeInput;

        const hasCafe = await this.cafeRepository.findOne({ name: cafe.name });
        if (hasCafe) throw new ConflictException('이미 등록된 이름입니다!!');

        const result = await this.cafeRepository.save({
            ...cafe,
        });

        return result;
    }

    async update({ updateCafeInput }) {
        const { ...cafe } = updateCafeInput;

        const result = await this.cafeRepository.update(
            { name: cafe.name }, //
            { ...cafe },
        );

        if (result.affected) {
            return await this.cafeRepository.findOne({ name: cafe.name });
        } else {
            throw new ConflictException('수정을 실패했습니다!!');
        }
    }

    async delete({ name }) {
        const result = await this.cafeRepository.softDelete({ name });

        console.log(result);
        if (result.affected) {
            return true;
        } else {
            throw new ConflictException('삭제를 실패했습니다!!');
        }
    }
}
