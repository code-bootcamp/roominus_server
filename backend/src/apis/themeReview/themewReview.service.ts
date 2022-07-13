import { ConflictException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Theme } from '../theme/entities/theme.entity';
import { User } from '../user/entities/user.entity';
import { ThemeReview } from './entities/themeReview.entity';

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

    async findAll({ themeId }) {
        const result = await this.themeReviewRepository.find({
            where: { theme: themeId },
            relations: ['theme', 'user'],
            order: { createdAt: 'DESC' },
        });

        if (result.length == 0) throw new UnprocessableEntityException('등록된 후기가 없습니다!!');

        return result;
    }

    async create({ themeId, createThemeReviewInput }) {
        const { writerName, ...themeReview } = createThemeReviewInput;

        const hasTheme = await this.themeRepository.findOne({ id: themeId });
        if (!hasTheme) throw new UnprocessableEntityException('없는 테마입니다!!');

        const currentUser = await this.userRepository.findOne({ name: writerName });

        const newThemeReview = await this.themeReviewRepository.save({
            ...themeReview,
            theme: themeId,
            user: currentUser.id,
        });

        const result = await this.themeReviewRepository.findOne({
            where: { id: newThemeReview.id },
            relations: ['theme', 'user'],
        });

        return result;
    }

    async update({ themeReviewId, updateThemeReviewInput }) {
        const { ...themeReview } = updateThemeReviewInput;

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

    async delete({ themeReviewId }) {
        const result = await this.themeReviewRepository.softDelete({ id: themeReviewId });

        if (result.affected) {
            return true;
        } else {
            throw new ConflictException('삭제를 실패했습니다!!');
        }
    }
}
