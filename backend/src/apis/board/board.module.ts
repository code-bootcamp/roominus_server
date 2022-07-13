import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardTag } from '../boardTag/entities/boardTag.entity';
import { BoardResolver } from './board.resolver';
import { BoardService } from './board.service';
import { Board } from './entities/board.entity';
import { BoardImg } from './entities/boardImg.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Board, BoardTag, BoardImg])],
    providers: [
        BoardResolver, //
        BoardService,
        BoardTag,
    ],
})
export class BoardModule {}
