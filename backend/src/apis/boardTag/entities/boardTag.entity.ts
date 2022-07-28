import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

import { Board } from 'src/apis/board/entities/board.entity';

@Entity()
@ObjectType()
export class BoardTag {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column()
    @Field(() => String)
    title: string;

    @ManyToMany(() => Board, boards => boards.boardTags)
    @Field(() => [Board])
    boards: Board[];
}
