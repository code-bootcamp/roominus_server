import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { ThemeReivewResolver } from './themeReview.resolver';
import { ThemeReivewService } from './themewReview.service';

import { ThemeReview } from './entities/themeReview.entity';
import { Theme } from '../theme/entities/theme.entity';
import { User } from '../user/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ThemeReview, User, Theme])],
    providers: [ThemeReivewResolver, ThemeReivewService],
})
export class ThemeReviewModule {}
