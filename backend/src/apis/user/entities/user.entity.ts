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
    @Field(() => String)
    userid: string;

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

    @Column({ nullable: true })
    @Field(() => String, { nullable: true })
    nickname: string;

    @Column({ default: 0 })
    @Field(() => Int, { nullable: true })
    point: number;

    @CreateDateColumn()
    @Field(() => Date)
    createAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
