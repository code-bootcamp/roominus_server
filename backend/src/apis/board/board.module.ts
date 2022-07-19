import { Module, UseGuards } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardreviewResolver } from '../boardsreview/boardreview.resolver';
import { BoardreviewService } from '../boardsreview/boardreview.service';
import { Boardreview } from '../boardsreview/entities/boardreview.entity';
import { BoardTag } from '../boardTag/entities/boardTag.entity';
import { User } from '../user/entities/user.entity';
import { BoardResolver } from './board.resolver';
import { BoardService } from './board.service';
import { Board } from './entities/board.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Board, BoardTag, User, Boardreview])],
    providers: [
        BoardResolver, //
        BoardService,
        BoardTag,
        BoardreviewResolver,
        BoardreviewService,
    ],
})
export class BoardModule {}
