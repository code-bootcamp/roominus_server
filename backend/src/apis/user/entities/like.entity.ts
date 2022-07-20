import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './user.entity';
import { Theme } from 'src/apis/theme/entities/theme.entity';

@Entity()
@ObjectType()
export class Like {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Field(() => String)
    userId: string;

    @Column()
    @Field(() => String)
    themeId: string;

    @JoinColumn({ name: 'userId' })
    @ManyToOne(() => User, user => user.likeThemes, { nullable: true })
    // @Field(() => User)
    user: User;

    @JoinColumn({ name: 'themeId' })
    @ManyToOne(() => Theme, theme => theme.likeUsers, { nullable: true })
    // @Field(() => Theme)
    theme: Theme;
}
