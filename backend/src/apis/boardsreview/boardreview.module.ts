import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from '../board/entities/board.entity';
import { Boardsecondreview } from '../boardsecondreview/entities/boardsecondreview.entity';
import { User } from '../user/entities/user.entity';
import { UserResolver } from '../user/user.resolver';
import { UserService } from '../user/user.service';
import { BoardreviewResolver } from './boardreview.resolver';
import { BoardreviewService } from './boardreview.service';
import { Boardreview } from './entities/boardreview.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Board, Boardreview, User, Boardsecondreview])],
    providers: [
        BoardreviewResolver, //
        BoardreviewService,
    ],
})
export class BoardreviewModule {}
