import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Theme } from 'src/apis/theme/entities/theme.entity';

@Entity()
export class ThemeImg {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ default: false })
    isMain: boolean;

    @Column({ length: '200' })
    url: string;

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => Theme)
    theme: Theme;
}
