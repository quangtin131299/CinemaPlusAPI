import { Controller, Get, Put, Query } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Ghe } from 'Models/entities/Ghe';
import { SeatService } from './seat.service';

@ApiTags('Seat')
@Controller('seat')
export class SeatController {
  
  private readonly GETALLSEATOFROOM :number = 0;
  private readonly GETALLSEATBOOKINGOFROOM: number = 1;
  
  constructor(private seatServie: SeatService) {}

  @Get('/getallseatofroom')
  @ApiOkResponse({description: 'Get all seat of room'})
  @ApiNotFoundResponse({description: 'Not Found'})
  getSeatOfRoom(
    @Query('idMovie') idMovie: number,
    @Query('currentDate') currentDate: string,
    @Query('idRoom') idRoom: number,
    @Query('idShowTime') idShowTime: number,
    @Query('idCinema') idCinema: number
  ): Promise<Ghe[]> {
    return this.seatServie.getSeatOfRoom(idMovie, currentDate, idRoom, idShowTime, idCinema,this.GETALLSEATOFROOM);
  }

  @Get('/getallseatbooking')
  @ApiOkResponse({description: 'Get all seat booking of room'})
  @ApiNotFoundResponse({description: 'Not Found'})
  getAllSeatBookingOfRoom(@Query('idMovie') idMovie: number
                          , @Query('currentDate') currentDate: string
                          , @Query('idRoom') idRoom: number
                          , @Query('idShowTime') idShowTime: number
                          , @Query('idCinema') idCinema: number): Promise<Ghe[]> {  
    
    return this.seatServie.getSeatOfRoom(idMovie, currentDate, idRoom, idShowTime, idCinema,this.GETALLSEATBOOKINGOFROOM);
  }
  
}
