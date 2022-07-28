import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { BoardreviewResolver } from './boardreview.resolver';
import { BoardreviewService } from './boardreview.service';

import { Boardsecondreview } from '../boardsecondreview/entities/boardsecondreview.entity';
import { Boardreview } from './entities/boardreview.entity';
import { Board } from '../board/entities/board.entity';
import { User } from '../user/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Board, Boardreview, User, Boardsecondreview])],
    providers: [
        BoardreviewResolver, //
        BoardreviewService,
    ],
})
export class BoardreviewModule {}
