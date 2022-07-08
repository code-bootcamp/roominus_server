import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ThemeReivewResolver } from './themeReview.resolver';
import { ThemeReivewService } from './themewReview.service';

import { ThemeReview } from './entities/themeReview.entity';
import { User } from '../user/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ThemeReview, User])],
    providers: [ThemeReivewResolver, ThemeReivewService],
})
export class ThemeReviewModule {}
