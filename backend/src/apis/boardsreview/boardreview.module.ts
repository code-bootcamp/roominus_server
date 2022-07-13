import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from '../board/entities/board.entity';
import { BoardreviewResolver } from './boardreview.resolver';
import { BoardreviewService } from './boardreview.service';
import { Boardreview } from './entities/boardreview.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Board, Boardreview])],
    providers: [
        BoardreviewResolver, //
        BoardreviewService,
    ],
})
export class BoardreviewModule {}
