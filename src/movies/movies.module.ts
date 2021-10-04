import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Khachhang } from 'Models/entities/Khachhang';
import { KhachhangPhim } from 'Models/entities/KhachhangPhim';
import { Phim } from 'Models/entities/Phim';
import { ScheduleModule } from 'src/schedule/schedule.module';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  imports: [TypeOrmModule.forFeature([Phim, KhachhangPhim]), ScheduleModule],
  controllers: [MoviesController],
  providers: [MoviesService]
})
export class MoviesModule {}
