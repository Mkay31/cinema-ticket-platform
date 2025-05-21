import { JsonController, Post, Body, Get, Param, QueryParam } from 'routing-controllers';
import { Inject } from 'typedi';
import { ResponseSchema } from 'routing-controllers-openapi';
import {
    CreateCinemaRequest,
    GenericDataResponse,
    PurchaseSeatRequest,
} from '../models';
import { CinemaService } from '../services';

@JsonController('/cinema')
export class CinemaController {

    @Inject()
    private cinemaService: CinemaService;

    @Post('/')
    @ResponseSchema(GenericDataResponse)
    public async createCinema(
        @Body() request: CreateCinemaRequest,
    ): Promise<GenericDataResponse> {
        return new GenericDataResponse(await this.cinemaService.createCinema(request));
    }

    @Get("/")
    @ResponseSchema(GenericDataResponse)
    async getCinemaList(
        @QueryParam("page", { required: false }) page: number = 1,
        @QueryParam("page_size", { required: false }) page_size: number = 10,
    ): Promise<GenericDataResponse> {
        return new GenericDataResponse(await this.cinemaService.getCinemaList(page, page_size));
    }

    @Get("/:id")
    @ResponseSchema(GenericDataResponse)
    async getCinema(
        @Param("id") id: number
    ): Promise<GenericDataResponse> {
        return new GenericDataResponse(await this.cinemaService.getCinemaById(id));
    }

    @Post("/:id/purchase-seat")
    @ResponseSchema(GenericDataResponse)
    async purchaseSeat(
        @Param("id") id: number,
        @Body() body: PurchaseSeatRequest
    ) {
        const seat = await this.cinemaService.purchaseSeat(id, body.seatNumber);
        return new GenericDataResponse(seat);
    }

    @Post("/:id/purchase-consecutive-seats")
    async purchaseConsecutiveSeats(
        @Param("id") id: number
    ) {
        const seats = await this.cinemaService.purchaseConsecutiveSeats(id);
        return new GenericDataResponse(seats);
    }

}
