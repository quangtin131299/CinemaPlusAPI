import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lichchieu } from 'DTO/entities/Lichchieu';
import { PhimLichchieu } from 'DTO/entities/PhimLichchieu';
import { Suatchieu } from 'DTO/entities/Suatchieu';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';

@Module({
  imports:[TypeOrmModule.forFeature([Lichchieu, Suatchieu, PhimLichchieu])],
  controllers:[ScheduleController],
  providers: [ScheduleService],
  exports: [ScheduleService]
})
export class ScheduleModule {}
