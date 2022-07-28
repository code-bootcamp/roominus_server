import { Field, ObjectType } from '@nestjs/graphql';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { Boardreview } from 'src/apis/boardsreview/entities/boardreview.entity';
import { User } from 'src/apis/user/entities/user.entity';

@Entity()
@ObjectType()
export class Boardsecondreview {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column()
    @Field(() => String)
    content: string;

    @CreateDateColumn()
    @Field(() => Date)
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => User)
    @Field(() => User, { nullable: true })
    user: User;

    @ManyToOne(() => Boardreview)
    @Field(() => Boardreview, { nullable: true })
    boardreview: Boardreview;
}
