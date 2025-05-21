import { IsNumber } from 'class-validator';

export class GenericDataResponse {
    data: any;

    @IsNumber()
    statusCode: number;

    constructor(data: any, statusCode?: number) {
        this.data = data;
        this.statusCode = statusCode ?? 200;
    }
}
