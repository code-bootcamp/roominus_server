import { ConflictException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cafe } from '../cafe/entities/cafe.entity';
import { Genre } from '../genre/entities/genre.entity';
import { Theme } from './entities/theme.entity';
import { ThemeImg } from './entities/themeImg.entity';

@Injectable()
export class ThemeService {
    constructor(
        @InjectRepository(Theme)
        private readonly themeRepository: Repository<Theme>,
        @InjectRepository(ThemeImg)
        private readonly themeImgRepository: Repository<ThemeImg>,
        @InjectRepository(Cafe)
        private readonly cafeRepository: Repository<Cafe>,
        @InjectRepository(Genre)
        private readonly genreRepository: Repository<Genre>,
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

    async create({ cafeName, genreName, createThemeInput }) {
        const { mainImg, subImgs, ...theme } = createThemeInput;

        const hasCafe = await this.cafeRepository.findOne({ name: cafeName });

        const hasGenre = await this.genreRepository.findOne({ name: genreName });

        const hasTheme = await this.themeRepository.findOne({ title: theme.title });
        if (hasTheme) throw new ConflictException('이미 등록된 이름입니다!!');

        const result = await this.themeRepository.save({
            ...theme,
            cafe: hasCafe.id,
            genre: hasGenre.id,
        });

        await this.themeImgRepository.save({
            isMain: true,
            url: mainImg,
            theme: result.id,
        });

        if (subImgs && subImgs.length) {
            for (let i = 0; i < subImgs.length; i++) {
                await this.themeImgRepository.save({
                    url: subImgs[i],
                    theme: result.id,
                });
            }
        }

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
