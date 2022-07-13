import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsecondreviewResolver } from './boardsecondreview.resolver';
import { BoardsecondreviewService } from './boardsecondreview.service';
import { Boardsecondreview } from './entities/boardsecondreview.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Boardsecondreview])],
    providers: [
        BoardsecondreviewResolver, //
        BoardsecondreviewService,
    ],
})
export class BoardsecondreviewModule {}
