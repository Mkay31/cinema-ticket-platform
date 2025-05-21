import { IsNumber, IsString } from 'class-validator';

export class CreateCinemaRequest {
    @IsString()
    name: string;

    @IsNumber()
    totalSeats: number;
}
