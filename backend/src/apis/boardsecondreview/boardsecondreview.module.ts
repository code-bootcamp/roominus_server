import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BoardsecondreviewResolver } from './boardsecondreview.resolver';
import { BoardsecondreviewService } from './boardsecondreview.service';

import { Boardreview } from '../boardsreview/entities/boardreview.entity';
import { Boardsecondreview } from './entities/boardsecondreview.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Boardreview, Boardsecondreview])],
    providers: [
        BoardsecondreviewResolver, //
        BoardsecondreviewService,
    ],
})
export class BoardsecondreviewModule {}
