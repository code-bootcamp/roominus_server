import { Field, Int, ObjectType } from '@nestjs/graphql';
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

import { Genre } from 'src/apis/genre/entities/genre.entity';
import { Cafe } from 'src/apis/cafe/entities/cafe.entity';
import { Like } from 'src/apis/user/entities/like.entity';

@Entity()
@ObjectType()
export class Theme {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column()
    @Field(() => String)
    title: string;

    @Column()
    @Field(() => Int)
    rank: number;

    @Column({ nullable: true })
    @Field(() => String, { nullable: true })
    intro_title: string;

    @Column({ nullable: true })
    @Field(() => String, { nullable: true })
    intro_content: string;

    @Column()
    @Field(() => Int)
    agelimit: number;

    @Column()
    @Field(() => Int)
    peoplelimit: number;

    @Column()
    @Field(() => String)
    clearTime: string;

    @Column({ default: 0 })
    @Field(() => Int)
    like: number;

    @Column()
    @Field(() => String)
    mainImg: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => Cafe, { eager: true })
    @Field(() => Cafe, { nullable: true })
    cafe: Cafe;

    @ManyToOne(() => Genre)
    @Field(() => Genre)
    genre: Genre;

    @OneToMany(() => Like, like => like.theme)
    @Field(() => [Like], { nullable: true })
    likeUsers: Like[];
}
