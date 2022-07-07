import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { Cafe } from 'src/apis/cafe/entities/cafe.entity';
import { Genre } from 'src/apis/genre/entities/genre.entity';

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

    @Column()
    @Field(() => String)
    intro_title: string;

    @Column()
    @Field(() => String)
    intro_content: string;

    @Column()
    @Field(() => Int)
    agelimit: number;

    @Column()
    @Field(() => Int)
    like: number;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => Cafe)
    cafe: Cafe;

    @ManyToOne(() => Genre)
    genre: Genre;
}
