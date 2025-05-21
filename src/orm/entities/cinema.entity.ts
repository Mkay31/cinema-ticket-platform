import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Seat } from './seat.entity';

@Entity()
export class Cinema {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		unique: true,
		nullable: false
	})
	name: string;

	@Column()
	totalSeats: number;

	@OneToMany(() => Seat, seat => seat.cinema, { cascade: true })
	seats: Seat[];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
