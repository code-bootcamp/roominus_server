import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Cafe } from 'src/apis/cafe/entities/cafe.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToMany,
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
    @Field(() => Int, { nullable: true })
    userpoint: number;

    @CreateDateColumn()
    @Field(() => Date)
    createdAt: Date;

    @UpdateDateColumn()
    @Field(() => Date)
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToMany(() => Cafe, cafes => cafes.users)
    @Field(() => [String])
    cafes: string[];
}
