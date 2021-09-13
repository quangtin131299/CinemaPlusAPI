import { Controller, Get, Query } from '@nestjs/common';
import { Phong } from 'DTO/entities/Phong';

import { RoomService } from './room.service';

@Controller('room')
export class RoomController {

  constructor(private roomService: RoomService) {}

  @Get('/getroomofnowmovie')
  getRoomofNowMovie(
    @Query('idMovie') idMovie: number,
    @Query('idCinema') idCinema: number,
    @Query('currentDate') currentDate: string,
    @Query('idShowTime') idShowTime: number,
  ): Promise<Phong> {
    return this.roomService.getRoomOfNowMovie(idMovie, idShowTime, currentDate, idCinema);
  }
}
