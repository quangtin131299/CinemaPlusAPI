import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phim } from 'DTO/entities/Phim';
import { ScheduleModule } from 'src/schedule/schedule.module';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  imports: [TypeOrmModule.forFeature([Phim]), ScheduleModule],
  controllers: [MoviesController],
  providers: [MoviesService]
})
export class MoviesModule {}
