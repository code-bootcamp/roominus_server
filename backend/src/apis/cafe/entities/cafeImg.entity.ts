import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Cafe } from 'src/apis/cafe/entities/cafe.entity';

@Entity()
export class CafeImg {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ default: false })
    isMain: boolean;

    @Column()
    url: string;

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => Cafe)
    cafe: Cafe;
}
