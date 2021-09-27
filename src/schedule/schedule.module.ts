import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lichchieu } from 'Models/entities/Lichchieu';
import { PhimLichchieu } from 'Models/entities/PhimLichchieu';
import { Suatchieu } from 'Models/entities/Suatchieu';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';

@Module({
  imports:[TypeOrmModule.forFeature([Lichchieu, Suatchieu, PhimLichchieu])],
  controllers:[ScheduleController],
  providers: [ScheduleService],
  exports: [ScheduleService]
})
export class ScheduleModule {}
