import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BoardreviewResolver } from '../boardsreview/boardreview.resolver';
import { BoardreviewService } from '../boardsreview/boardreview.service';
import { BoardResolver } from './board.resolver';
import { BoardService } from './board.service';

import { Boardsecondreview } from '../boardsecondreview/entities/boardsecondreview.entity';
import { Boardreview } from '../boardsreview/entities/boardreview.entity';
import { BoardTag } from '../boardTag/entities/boardTag.entity';
import { BoardLike } from './entities/boardLike.entity';
import { User } from '../user/entities/user.entity';
import { Board } from './entities/board.entity';
import { SocialUser } from '../socialUser/entities/socialUser.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Board, BoardTag, User, SocialUser, Boardreview, Boardsecondreview, BoardLike])],
    providers: [
        BoardResolver, //
        BoardService,
        BoardTag,
        BoardreviewResolver,
        BoardreviewService,
    ],
})
export class BoardModule {}
