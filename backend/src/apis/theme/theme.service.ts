import { ConflictException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Theme } from './entities/theme.entity';

@Injectable()
export class ThemeServie {
    constructor(
        @InjectRepository(Theme)
        private readonly themeRepository: Repository<Theme>,
    ) {}

    async findAll() {
        const result = await this.themeRepository.find();

        if (result.length == 0) throw new UnprocessableEntityException('등록된 테마가 없습니다!!');

        return result;
    }

    async findOne({ title }) {
        const result = await this.themeRepository.findOne({
            where: { title },
        });

        if (!result) throw new UnprocessableEntityException('찾으시는 테마가 없습니다!!');

        return result;
    }

    async create({ createThemeInput }) {
        const { ...theme } = createThemeInput;

        const hasTheme = await this.themeRepository.findOne({ title: theme.title });
        if (hasTheme) throw new ConflictException('이미 등록된 이름입니다!!');

        const result = await this.themeRepository.save({
            ...theme,
        });

        return result;
    }

    async update({ updateThemeInput }) {
        const { ...theme } = updateThemeInput;

        const result = await this.themeRepository.update(
            { title: theme.title }, ///
            { ...theme },
        );

        if (result.affected) {
            return await this.themeRepository.findOne({ title: theme.title });
        } else {
            throw new ConflictException('수정을 실패했습니다!!');
        }
    }

    async delete({ title }) {
        const result = await this.themeRepository.softDelete({ title });

        if (result.affected) {
            return true;
        } else {
            throw new ConflictException('삭제를 실패했습니다!!');
        }
    }
}
