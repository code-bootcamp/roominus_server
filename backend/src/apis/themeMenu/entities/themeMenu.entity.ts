import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { Cafe } from 'src/apis/cafe/entities/cafe.entity';
import { Theme } from 'src/apis/theme/entities/theme.entity';

@Entity()
@ObjectType()
export class ThemeMenu {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column()
    @Field(() => String)
    reservation_time: string;

    @Column()
    @Field(() => Int)
    people_number: number;

    @Column()
    @Field(() => Int)
    price: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => Cafe)
    @Field(() => Cafe)
    cafe: Cafe;

    @ManyToOne(() => Theme, { eager: true })
    @Field(() => Theme)
    theme: Theme;
}
