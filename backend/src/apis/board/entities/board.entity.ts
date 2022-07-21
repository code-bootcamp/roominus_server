import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { Boardreview } from 'src/apis/boardsreview/entities/boardreview.entity';
import { BoardTag } from 'src/apis/boardTag/entities/boardTag.entity';
import { User } from 'src/apis/user/entities/user.entity';

@Entity()
@ObjectType()
export class Board {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column()
    @Field(() => String)
    title: string;

    @Column()
    @Field(() => String)
    content: string;

    @Column()
    @Field(() => String, { nullable: true })
    mainImg: string;

    @CreateDateColumn()
    @Field(() => Date)
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @Column({ default: 0, nullable: true })
    @Field(() => Int)
    like: number;

    @Column({ default: 0, nullable: true })
    @Field(() => Int)
    view: number;

    @JoinTable()
    @OneToMany(() => Boardreview, boardreview => boardreview.board)
    @Field(() => [Boardreview])
    boardreview: Boardreview[];

    @JoinTable()
    @ManyToMany(() => BoardTag, boardTags => boardTags.boards)
    @Field(() => [BoardTag], { nullable: true })
    boardTags: BoardTag[];

    @ManyToOne(() => User)
    @Field(() => User, { nullable: true })
    user: User;
}
