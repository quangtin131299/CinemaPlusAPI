import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { Ghe } from 'DTO/entities/Ghe';
import { SeatService } from './seat.service';

@Controller('seat')
export class SeatController {
  
  private readonly GETALLSEATOFROOM :number = 0;
  private readonly GETALLSEATBOOKINGOFROOM: number = 1;
  
  constructor(private seatServie: SeatService) {}

  @Get('/getallseatofroom')
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
  getAllSeatBookingOfRoom(@Query('idMovie') idMovie: number
                          , @Query('currentDate') currentDate: string
                          , @Query('idRoom') idRoom: number
                          , @Query('idShowTime') idShowTime: number
                          , @Query('idCinema') idCinema: number): Promise<Ghe[]> {  
    
    return this.seatServie.getSeatOfRoom(idMovie, currentDate, idRoom, idShowTime, idCinema,this.GETALLSEATBOOKINGOFROOM);
  }
  
}
