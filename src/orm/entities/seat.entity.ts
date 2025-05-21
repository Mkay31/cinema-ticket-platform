import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Cinema } from './cinema.entity';

@Entity()
@Unique(["seatNumber", "cinema"])
export class Seat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    seatNumber: number;

    @Column({ default: false })
    isOccupied: boolean;

    @ManyToOne(() => Cinema, cinema => cinema.seats, { onDelete: "CASCADE" })
    @JoinColumn()
    cinema: Cinema;

    @Column()
    cinemaId: number;
}