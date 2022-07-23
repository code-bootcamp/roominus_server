import { Field, ObjectType } from '@nestjs/graphql';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { ThemeMenu } from 'src/apis/themeMenu/entities/themeMenu.entity';
import { Payment } from 'src/apis/payment/entities/payment.entity';
import { Cafe } from 'src/apis/cafe/entities/cafe.entity';
import { User } from 'src/apis/user/entities/user.entity';

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
    @Field(() => Cafe, { nullable: true })
    cafe: Cafe;

    // 예약자
    @ManyToOne(() => User)
    @Field(() => User)
    user: User;

    // 예약할 테마와 시간
    @ManyToOne(() => ThemeMenu, { eager: true })
    @Field(() => ThemeMenu)
    theme_menu: ThemeMenu;

    @JoinColumn()
    @OneToOne(() => Payment)
    @Field(() => Payment)
    payment: string;
}
