import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vedat } from 'DTO/entities/Vedat';
import { BillModule } from 'src/bill/bill.module';
import { SeatModule } from 'src/seat/seat.module';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';

@Module({
  imports:[TypeOrmModule.forFeature([Vedat]), BillModule, SeatModule, JwtModule.register({
    secret: 'secret',
    signOptions: {
      expiresIn: '1d',
    },
  }),],
  controllers:[TicketsController],
  providers: [TicketsService]
})
export class TicketsModule {}
