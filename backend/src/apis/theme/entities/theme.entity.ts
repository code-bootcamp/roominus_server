import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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
    introtitle: string;

    @Column()
    @Field(() => String)
    introcontent: string;

    @Column()
    @Field(() => Int)
    agelimit: number;

    @Column()
    @Field(() => Int)
    like: number;

    ///
    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()

    ///
    @DeleteDateColumn()
    deletedAt: Date;
}
