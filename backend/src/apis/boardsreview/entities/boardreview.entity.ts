import { Field, ObjectType } from '@nestjs/graphql';
import { Boardsecondreview } from 'src/apis/boardsecondreview/entities/boardsecondreview.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Boardreview {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column()
    @Field(() => String)
    content: string;

    @ManyToOne(() => Boardsecondreview)
    @Field(() => Boardsecondreview)
    boardsecondreview: Boardsecondreview;

    @CreateDateColumn()
    @Field(() => Date)
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
