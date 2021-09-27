import { Controller, Get, Query } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Phong } from 'Models/entities/Phong';

import { RoomService } from './room.service';

@ApiTags('Room')
@Controller('room')
export class RoomController {

  constructor(private roomService: RoomService) {}

  @Get('/getroomofnowmovie')
  @ApiOkResponse({description: 'Get room of cinema by id cinema, id showtime, current date.'})
  @ApiNotFoundResponse({description:'Not Found.'})
  getRoomofNowMovie(
    @Query('idMovie') idMovie: number,
    @Query('idCinema') idCinema: number,
    @Query('currentDate') currentDate: string,
    @Query('idShowTime') idShowTime: number,
  ): Promise<Phong> {
    return this.roomService.getRoomOfNowMovie(idMovie, idShowTime, currentDate, idCinema);
  }
}
