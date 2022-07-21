import { ConflictException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ThemeReview } from './entities/themeReview.entity';
import { Theme } from '../theme/entities/theme.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ThemeReivewService {
    constructor(
        @InjectRepository(ThemeReview)
        private readonly themeReviewRepository: Repository<ThemeReview>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Theme)
        private readonly themeRepository: Repository<Theme>,
    ) {}

    async findAll({ themeId, page }) {
        const result = await this.themeReviewRepository.find({
            where: { theme: themeId },
            relations: ['theme', 'user'],
            take: 12,
            skip: (page - 1) * 12,
            order: { createdAt: 'DESC' },
        });

        if (result.length == 0) throw new UnprocessableEntityException('등록된 후기가 없습니다!!');

        return result;
    }

    async findAllCount() {
        return await this.themeReviewRepository.count();
    }

    async findwithUser({ userInfo, page }) {
        const result = await this.themeReviewRepository.find({
            where: { user: userInfo.id },
            relations: ['theme', 'user'],
            take: 10,
            skip: (page - 1) * 10,
            order: { createdAt: 'DESC' },
        });

        if (result.length == 0) throw new UnprocessableEntityException('작성하신 후기가 없습니다!!');

        return result;
    }

    async findwithUserCount({ userInfo }) {
        return await this.themeReviewRepository.count({
            user: userInfo.id,
        });
    }

    async create({ userInfo, themeId, createThemeReviewInput }) {
        const { ...themeReview } = createThemeReviewInput;

        const hasTheme = await this.themeRepository.findOne({ id: themeId });
        if (!hasTheme) throw new UnprocessableEntityException('없는 테마입니다!!');

        const newThemeReview = await this.themeReviewRepository.save({
            ...themeReview,
            theme: themeId,
            user: userInfo.id,
        });

        const result = await this.themeReviewRepository.findOne({
            where: { id: newThemeReview.id },
            relations: ['theme', 'user'],
        });

        return result;
    }

    // 토큰 완성되면 작성자만 변경가능하게 수정
    async update({ userInfo, themeReviewId, updateThemeReviewInput }) {
        const { ...themeReview } = updateThemeReviewInput;

        const hasThemeReview = await this.themeReviewRepository.findOne({
            where: { id: themeReviewId },
            relations: ['user'],
        });
        if (hasThemeReview.user.id !== userInfo.id) throw new UnprocessableEntityException('작성자가 아닙니다!');

        const result = await this.themeReviewRepository.update(
            { id: themeReviewId }, ///
            { ...themeReview },
        );

        if (result.affected) {
            return await this.themeReviewRepository.findOne({
                where: { id: themeReviewId },
                relations: ['theme', 'user'],
            });
        } else {
            throw new ConflictException('수정을 실패했습니다!!');
        }
    }

    async delete({ userInfo, themeReviewId }) {
        const hasThemeReview = await this.themeReviewRepository.findOne({
            where: { id: themeReviewId },
            relations: ['user'],
        });
        if (hasThemeReview.user.id !== userInfo.id) throw new UnprocessableEntityException('작성자가 아닙니다!');

        const result = await this.themeReviewRepository.softDelete({ id: themeReviewId });

        if (result.affected) {
            return true;
        } else {
            throw new ConflictException('삭제를 실패했습니다!!');
        }
    }
}
