import { IsNumber } from 'class-validator';

export class PurchaseSeatRequest {

    @IsNumber()
    seatNumber: number;

}
