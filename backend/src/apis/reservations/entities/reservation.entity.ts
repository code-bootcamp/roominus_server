import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Cafe } from 'src/apis/cafe/entities/cafe.entity';
import { User } from 'src/apis/user/entities/user.entity';
import { ThemeMenu } from 'src/apis/themeMenu/entities/themeMenu.entity';

@Entity()
@ObjectType()
export class Reservation {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column()
    @Field(() => String)
    reservation_date: string;

    @Column({ nullable: true })
    @Field(() => String, { nullable: true })
    memo: string;

    @Column({ default: '예약완료' })
    @Field(() => String)
    status: string;

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    // 예약할 카페
    @ManyToOne(() => Cafe)
    @Field(() => Cafe)
    cafe: Cafe;

    // 예약자
    @ManyToOne(() => User)
    @Field(() => User)
    user: User;

    // 예약할 테마와 시간
    @ManyToOne(() => ThemeMenu)
    @Field(() => ThemeMenu)
    theme_menu: ThemeMenu;
}
