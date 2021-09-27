import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ghe } from 'Models/entities/Ghe';
import { SeatController } from './seat.controller';
import { SeatService } from './seat.service';

@Module({
  imports:[TypeOrmModule.forFeature([Ghe])],
  controllers: [SeatController],
  providers: [SeatService],
  exports: [SeatService]
})
export class SeatModule {}
