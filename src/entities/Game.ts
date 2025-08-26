import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('games')
export class Game {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('json')
    board!: string[][];

    @Column('text', { nullable: true })
    winner!: string;

    @Column({ default: false })
    isDraw!: boolean;

    @Column()
    currentPlayer!: string;

    @CreateDateColumn()
    playedDate!: Date;

    @Column({ type: 'text' })
    status!: string;
}