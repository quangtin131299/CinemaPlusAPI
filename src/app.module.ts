import 'dotenv/config';

import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { CinemasModule } from './cinemas/cinemas.module';
import { TicketsModule } from './tickets/tickets.module';
import { AuthencationModule } from './authencation/authencation.module';
import { ScheduleModule } from './schedule/schedule.module';
import { CommentModule } from './comment/comment.module';
import { RoomModule } from './room/room.module';
import { SeatModule } from './seat/seat.module';
import { BillModule } from './bill/bill.module';
import { TypeModule } from './type/type.module';
import { CountryModule } from './country/country.module';
import { PopcornModule } from './popcorn/popcorn.module';
import { TokenclientModule } from './tokenclient/tokenclient.module';
import { DatabaseModule } from 'config/database/database.module';


@Module({
  imports: [
    DatabaseModule,
    MoviesModule,
    CinemasModule,
    TicketsModule,
    AuthencationModule,
    ScheduleModule,
    CommentModule,
    RoomModule,
    SeatModule,
    BillModule,
    TypeModule,
    CountryModule,
    PopcornModule,
    TokenclientModule,
  ],
})
export class AppModule {}
