import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardTag } from '../boardTag/entities/boardTag.entity';
import { Cafe } from '../cafe/entities/cafe.entity';
import { Theme } from '../theme/entities/theme.entity';
import { User } from '../user/entities/user.entity';
import { BoardResolver } from './board.resolver';
import { BoardService } from './board.service';
import { Board } from './entities/board.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Board, Cafe, Theme, User, BoardTag])],
    providers: [
        BoardResolver, //
        BoardService,
        BoardTag,
    ],
})
export class BoardModule {}
