import { Field, Float, ObjectType } from '@nestjs/graphql';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { User } from 'src/apis/user/entities/user.entity';

@Entity()
@ObjectType()
export class Cafe {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column()
    @Field(() => String)
    name: string;

    @Column()
    @Field(() => String)
    phone: string;

    @Column({ nullable: true })
    @Field(() => String, { nullable: true })
    intro_content: string;

    @Column()
    @Field(() => String)
    address: string;

    @Column({ nullable: true })
    @Field(() => String, { nullable: true })
    address_detail: string;

    @Column()
    @Field(() => Float)
    coordinate: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @JoinTable()
    @ManyToMany(() => User, users => users.cafes, { cascade: true })
    @Field(() => [User])
    users: User[];
}
