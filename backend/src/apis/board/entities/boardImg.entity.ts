import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Board } from './board.entity';

@Entity()
export class BoardImg {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: '200' })
    url: string;

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => Board)
    board: Board;
}
