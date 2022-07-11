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

    @Column({ nullable: true })
    @Field(() => String, { nullable: true })
    intro_title: string;

    @Column({ nullable: true })
    @Field(() => String, { nullable: true })
    intro_content: string;

    @Column()
    @Field(() => Int)
    agelimit: number;

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

    @ManyToOne(() => Cafe)
    @Field(() => Cafe)
    cafe: Cafe;

    @ManyToOne(() => Genre)
    @Field(() => Genre)
    genre: Genre;
}
