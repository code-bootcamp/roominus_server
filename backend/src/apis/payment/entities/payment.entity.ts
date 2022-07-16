import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Reservation } from 'src/apis/reservations/entities/reservation.entity';
import { User } from 'src/apis/user/entities/user.entity';

@Entity()
@ObjectType()
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column()
    @Field(() => String)
    imp_uid: string;

    @Column()
    @Field(() => String)
    merchant_uid: string;

    @Column()
    @Field(() => Int)
    price: number;

    @Column()
    @Field(() => Int)
    usepoint: number;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User)
    @Field(() => User)
    user: User;

    @JoinColumn()
    @OneToOne(() => Reservation)
    @Field(() => Reservation)
    reservation: string;
}
