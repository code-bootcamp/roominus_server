import { ConflictException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cafe } from '../cafe/entities/cafe.entity';
import { Genre } from '../genre/entities/genre.entity';
import { Like } from '../user/entities/like.entity';
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
        @InjectRepository(Like)
        private readonly likeRepository: Repository<Like>,
    ) {}

    async findAll() {
        const result = await this.themeRepository.find({
            relations: ['cafe', 'genre', 'likeUsers'],
        });

        if (result.length === 0) throw new UnprocessableEntityException('등록된 테마가 없습니다!!');
        return result;
    }

    async findPagination({ genreId, page }) {
        let result = [];
        if (genreId) {
            result = await this.themeRepository.find({
                where: { genre: genreId },
                relations: ['cafe', 'genre', 'likeUsers'],
                take: 12,
                skip: (page - 1) * 12,
                order: { createdAt: 'DESC' },
            });
        } else {
            result = await this.themeRepository.find({
                relations: ['cafe', 'genre', 'likeUsers'],
                take: 12,
                skip: (page - 1) * 12,
                order: { createdAt: 'DESC' },
            });
        }

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

    async findUserLikeList({ page, userInfo }) {
        const result = await this.likeRepository.find({
            where: { userId: userInfo.id },
            relations: ['theme'],
            take: 10,
            skip: (page - 1) * 10,
            order: { createdAt: 'DESC' },
        });

        if (result.length == 0) throw new UnprocessableEntityException('찜한 테마가 없습니다!!');

        return result;
    }

    async findUserLikeListCount({ userInfo }) {
        return await this.likeRepository.count({
            userId: userInfo.id,
        });
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

    async createLike({ themeId, userInfo }) {
        const hasLike = await this.likeRepository.findOne({
            where: { themeId: themeId, userId: userInfo.id },
        });

        if (hasLike) {
            await this.likeRepository.delete({
                themeId: themeId,
                userId: userInfo.id,
            });

            const theme = await this.themeRepository.findOne({ id: themeId });
            await this.themeRepository.update({ id: themeId }, { like: theme.like - 1 });

            return false;
        }

        await this.likeRepository.save({
            themeId: themeId,
            userId: userInfo.id,
        });

        const theme = await this.themeRepository.findOne({ id: themeId });
        await this.themeRepository.update({ id: themeId }, { like: theme.like + 1 });

        return true;
    }

    // async deleteLike({ themeId, userInfo }) {
    //     const hasLike = await this.likeRepository.findOne({
    //         where: { themeId: themeId, userId: userInfo.id },
    //     });
    //     if (!hasLike) return false;

    //     await this.likeRepository.delete({
    //         themeId: themeId,
    //         userId: userInfo.id,
    //     });

    //     const theme = await this.themeRepository.findOne({ id: themeId });
    //     await this.themeRepository.update({ id: themeId }, { like: theme.like - 1 });

    //     return true;
    // }
}
