import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Cafe } from 'src/apis/cafe/entities/cafe.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

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

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToMany(() => Cafe, cafes => cafes.users)
    @Field(() => [String])
    cafes: string[];
}
