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
        const result = await this.themeRepository.find({
            relations: ['cafe', 'genre'],
            order: { title: 'DESC' },
        });

        if (result.length == 0) throw new UnprocessableEntityException('등록된 테마가 없습니다!!');

        return result;
    }

    async findAllCount() {
        return await this.themeImgRepository.count();
    }

    async findOne({ themeId }) {
        const result = await this.themeRepository.findOne({
            where: { id: themeId },
            relations: ['cafe', 'genre'],
        });

        if (!result) throw new UnprocessableEntityException('찾으시는 테마가 없습니다!!');

        return result;
    }

    async findAllwithTheme({ cafeId }) {
        const result = await this.themeRepository.find({
            where: { cafe: cafeId },
            relations: ['cafe', 'genre'],
            order: { createdAt: 'DESC' },
        });

        if (result.length == 0) throw new UnprocessableEntityException('등록된 테마가 없습니다!!');

        return result;
    }

    async create({ cafeName, genreName, createThemeInput }) {
        const { mainImg, subImgs, ...theme } = createThemeInput;

        const hasCafe = await this.cafeRepository.findOne({ name: cafeName });

        const hasGenre = await this.genreRepository.findOne({ name: genreName });

        const hasTheme = await this.themeRepository.findOne({ title: theme.title });
        if (hasTheme) throw new ConflictException('이미 등록된 이름입니다!!');

        const newTheme = await this.themeRepository.save({
            ...theme,
            mainImg: mainImg,
            cafe: hasCafe.id,
            genre: hasGenre.id,
        });

        if (subImgs && subImgs.length) {
            for (let i = 0; i < subImgs.length; i++) {
                await this.themeImgRepository.save({
                    url: subImgs[i],
                    theme: newTheme.id,
                });
            }
        }

        const result = await this.themeRepository.findOne({
            where: { id: newTheme.id },
            relations: ['cafe', 'genre'],
        });

        return result;
    }

    async update({ themeId, updateThemeInput }) {
        const { subImgs, ...theme } = updateThemeInput;

        const result = await this.themeRepository.update(
            { id: themeId }, ///
            { ...theme },
        );

        if (subImgs && subImgs.length) {
            for (let i = 0; i < subImgs.length; i++) {
                await this.themeImgRepository.save({
                    url: subImgs[i],
                    theme: themeId,
                });
            }
        }

        if (result.affected) {
            return await this.themeRepository.findOne({
                where: { id: themeId },
                relations: ['cafe', 'genre'],
            });
        } else {
            throw new ConflictException('수정을 실패했습니다!!');
        }
    }

    async delete({ themeId }) {
        const result = await this.themeRepository.softDelete({ id: themeId });

        if (result.affected) {
            return true;
        } else {
            throw new ConflictException('삭제를 실패했습니다!!');
        }
    }
}
