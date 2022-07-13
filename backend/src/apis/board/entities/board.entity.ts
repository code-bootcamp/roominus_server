import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BoardTag } from 'src/apis/boardTag/entities/boardTag.entity';
import { Cafe } from 'src/apis/cafe/entities/cafe.entity';
import { Theme } from 'src/apis/theme/entities/theme.entity';
import { User } from 'src/apis/user/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

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
    @Field(() => String)
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

    @ManyToOne(() => Cafe)
    @Field(() => Cafe)
    cafe: Cafe;

    @ManyToOne(() => Theme)
    @Field(() => Theme)
    theme: Theme;

    @ManyToOne(() => User)
    @Field(() => User)
    user: User;

    @JoinTable()
    @ManyToMany(() => BoardTag, boardTags => boardTags.boards)
    @Field(() => [BoardTag])
    boardTags: BoardTag[];
}
