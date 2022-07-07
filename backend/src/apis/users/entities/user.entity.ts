import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column({ default: false })
    @Field(() => Boolean)
    isserviceprovider: boolean;

    @Column()
    // @Field(() => String) 비밀번호 노출 금지!!
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
    @Field(() => Int)
    point: number;

    ///
    @CreateDateColumn()
    createAt: Date;

    ///
    @DeleteDateColumn()
    deletedAt: Date;
}
