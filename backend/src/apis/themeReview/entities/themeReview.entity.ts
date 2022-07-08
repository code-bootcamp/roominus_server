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

import { Theme } from 'src/apis/theme/entities/theme.entity';
import { User } from 'src/apis/user/entities/user.entity';

@Entity()
@ObjectType()
export class ThemeReview {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column({ default: false })
    @Field(() => Boolean)
    clear: boolean;

    @Column()
    @Field(() => String)
    rank: string;

    @Column()
    @Field(() => String)
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => Theme)
    theme: Theme;

    @ManyToOne(() => User)
    user: User;
}
