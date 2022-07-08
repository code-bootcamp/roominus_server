import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
    @DeleteDateColumn()
    deletedAt: Date;

    @Column({ default: '0' })
    @Field(() => Int)
    like: number;

    @Column({ default: '0' })
    @Field(() => Int)
    view: number;
}
