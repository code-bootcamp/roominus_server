import { Field, ObjectType } from '@nestjs/graphql';
import { Board } from 'src/apis/board/entities/board.entity';
import { Boardsecondreview } from 'src/apis/boardsecondreview/entities/boardsecondreview.entity';
import { User } from 'src/apis/user/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Boardreview {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column()
    @Field(() => String)
    content: string;

    @CreateDateColumn()
    @Field(() => Date)
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => User)
    @Field(() => User, { nullable: true })
    user: User;

    @ManyToOne(() => Board)
    @Field(() => Board, { nullable: true })
    board: Board;

    @OneToMany(() => Boardsecondreview, boardsecondreview => boardsecondreview.boardreview)
    @Field(() => [Boardsecondreview], { nullable: true })
    boardsecondreview: Boardsecondreview[];
}
