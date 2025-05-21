import { InjectRepository } from 'typeorm-typedi-extensions';
import { CreateCinemaRequest } from 'src/models';
import { Service } from 'typedi';
import { Cinema, Seat } from '../orm/entities';
import { Repository } from 'typeorm';
import { ApiError } from '../errors';

@Service()
export class CinemaService {
    @InjectRepository(Cinema)
    private cinemaRepo: Repository<Cinema>;

    @InjectRepository(Seat)
    private seatRepo: Repository<Seat>;


    async createCinema(data: CreateCinemaRequest): Promise<Cinema> {
        const { name, totalSeats } = data;

        const existingCinema = await this.cinemaRepo.findOne({ where: { name } });
        if (existingCinema) {
            throw ApiError.conflict(`Cinema with name ${name} already exists`);
        }
        const cinema = new Cinema();
        cinema.name = name;
        cinema.totalSeats = totalSeats;
        const savedCinema = await this.cinemaRepo.save(cinema);
        // Create seats for the cinema
        const seats: Seat[] = [];
        for (let i = 1; i <= totalSeats; i++) {
            const seat = new Seat();
            seat.seatNumber = i;
            seat.isOccupied = false;
            seat.cinema = savedCinema;
            seats.push(seat);
        }
        await this.seatRepo.save(seats);
        return this.cinemaRepo.save(data);
    }

    async getCinemaList(page: number, page_size: number): Promise<{ cinemas: Cinema[], totalCount: number }> {
        const take = page_size;
        const skip = (page - 1) * page_size;
        const [cinemas, totalCount] = await this.cinemaRepo.findAndCount({
            take,
            skip
        });
        return { cinemas, totalCount };
    }

    async getCinemaById(id: number): Promise<Cinema> {

        const cinema = await this.cinemaRepo.findOne({
            where: { id },
            relations: ["seats"]
        });

        if (!cinema) {
            throw ApiError.notFound(`Cinema with id ${id} not found`);
        }
        return cinema;
    }

    async purchaseSeat(cinemaId: number, seatNumber: number): Promise<Seat> {
        try {
            const seat = await this.seatRepo.findOne({ where: { cinemaId, seatNumber } })
            if (!seat) {
                throw ApiError.notFound(`Seat ${seatNumber} not found in cinema ${cinemaId}`);
            }

            if (seat.isOccupied) {
                throw ApiError.conflict(`Seat ${seatNumber} is already purchased`);
            }
            seat.isOccupied = true;
            await this.seatRepo.save(seat);

            return seat;
        } catch (error) {
            throw error;
        }
    }

    async purchaseConsecutiveSeats(cinemaId: number): Promise<Seat[]> {


        try {
            const seats = await this.seatRepo.find({ where: { cinemaId, isOccupied: false }, order: { seatNumber: "ASC" } });
            // Find first two consecutive free seats
            let consecutiveSeats: Seat[] = [];
            for (let i = 1; i < seats.length; i++) {
                if (seats[i].seatNumber == seats[i - 1].seatNumber + 1) {
                    consecutiveSeats = [seats[i - 1], seats[i]];
                    break;
                }
            }

            if (consecutiveSeats.length !== 2) {
                throw ApiError.conflict("No two consecutive seats available");
            }

            consecutiveSeats[0].isOccupied = true;
            consecutiveSeats[1].isOccupied = true;

            await this.seatRepo.save(consecutiveSeats);

            return consecutiveSeats;
        } catch (error) {
            throw error;
        }
    }

}