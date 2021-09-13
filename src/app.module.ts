import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'DTO/entities/Admin';
import { Ghe } from 'DTO/entities/Ghe';
import { Giaodich } from 'DTO/entities/Giaodich';
import { Hoadon } from 'DTO/entities/Hoadon';
import { Khachhang } from 'DTO/entities/Khachhang';
import { Lichchieu } from 'DTO/entities/Lichchieu';
import { Loaiphim } from 'DTO/entities/Loaiphim';
import { PhimLichchieu } from 'DTO/entities/PhimLichchieu';
import { PhimPhongXuat } from 'DTO/entities/PhimPhongXuat';
import { Phong } from 'DTO/entities/Phong';
import { Rapphim } from 'DTO/entities/Rapphim';
import { Suatchieu } from 'DTO/entities/Suatchieu';
import { Vedat } from 'DTO/entities/Vedat';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { CinemasModule } from './cinemas/cinemas.module';
import { TicketsModule } from './tickets/tickets.module';
import { AuthencationModule } from './authencation/authencation.module';
import { Binhluan } from 'DTO/entities/Binhluan';
import { Nhacungcap } from 'DTO/entities/Nhacungcap';
import { ScheduleModule } from './schedule/schedule.module';
import { CommentModule } from './comment/comment.module';
import { RoomModule } from './room/room.module';
import { SeatModule } from './seat/seat.module';
import { BillModule } from './bill/bill.module';
import { TypeModule } from './type/type.module';
import { CountryModule } from './country/country.module';
import { Quocgia } from 'DTO/entities/Quocgia';
import { PopcornModule } from './popcorn/popcorn.module';
import { Bapnuoc } from 'DTO/entities/Bapnuoc';
import { HoadonBapnuoc } from 'DTO/entities/HoadonBapnuoc';
import { TokenclientModule } from './tokenclient/tokenclient.module';
import { Tokenclient } from 'DTO/entities/Tokenclient';
import { JwtModule } from '@nestjs/jwt';
import { Phim } from 'DTO/entities/Phim';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'boofood.cl8j8wc2hw4p.ap-southeast-1.rds.amazonaws.com',
      port: 3306,
      username: 'admin',
      password: '123456789',
      database: 'cinemaplus',
      entities: [
        Admin,
        Bapnuoc,
        Binhluan,
        Ghe,
        Giaodich,
        Hoadon,
        HoadonBapnuoc,
        Khachhang,
        Lichchieu,
        Loaiphim,
        Nhacungcap,
        Phim,
        PhimLichchieu,
        PhimPhongXuat,
        Phong,
        Quocgia,
        Rapphim,
        Suatchieu,
        Tokenclient,
        Vedat
      ],
      
      synchronize: true,
    }),
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
