import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Board } from 'src/apis/board/entities/board.entity';
import { Cafe } from 'src/apis/cafe/entities/cafe.entity';
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

@Entity()
@ObjectType()
export class User {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column({ default: false })
    @Field(() => Boolean, { nullable: true })
    isserviceprovider: boolean;

    @Column()
    @Field(() => String)
    password: string;

    @Column()
    @Field(() => String)
    name: string;

    @Column()
    @Field(() => String)
    phone: string;

    @Column()
    @Field(() => String)
    email: string;

    @Column({ default: 0 })
    @Field(() => Int, { nullable: true })
    point: number;

    @CreateDateColumn()
    @Field(() => Date)
    createdAt: Date;

    @UpdateDateColumn()
    @Field(() => Date)
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToMany(() => Cafe, cafe => cafe.users)
    @Field(() => [String], { nullable: true })
    cafe: string[];

    @JoinTable()
    @OneToMany(() => Board, board => board.user)
    @Field(() => [Board], { nullable: true })
    board: Board[];
}
