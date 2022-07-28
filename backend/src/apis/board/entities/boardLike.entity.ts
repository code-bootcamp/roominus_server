import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

import { User } from 'src/apis/user/entities/user.entity';
import { Board } from './board.entity';

@Entity()
@ObjectType()
export class BoardLike {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Field(() => String)
    userId: string;

    @Column()
    @Field(() => String)
    boardId: string;

    @CreateDateColumn()
    createdAt: Date;

    @JoinColumn({ name: 'userId' })
    @ManyToOne(() => User, user => user.likeBoards)
    @Field(() => User)
    user: User;

    @JoinColumn({ name: 'boardId' })
    @ManyToOne(() => Board, board => board.likeUsers)
    @Field(() => Board)
    board: Board;
}
