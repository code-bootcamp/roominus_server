import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardreviewResolver } from './boardreview.resolver';
import { BoardreviewService } from './boardreview.service';
import { Boardreview } from './entities/boardreview.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Boardreview])],
    providers: [
        BoardreviewResolver, //
        BoardreviewService,
    ],
})
export class BoardreviewModule {}
