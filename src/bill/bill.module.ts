import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hoadon } from 'DTO/entities/Hoadon';
import { HoadonBapnuoc } from 'DTO/entities/HoadonBapnuoc';
import { BillController } from './bill.controller';
import { BillService } from './bill.service';

@Module({
  imports: [TypeOrmModule.forFeature([Hoadon,HoadonBapnuoc])],
  controllers: [BillController],
  providers: [BillService],
  exports:[BillService]
})
export class BillModule {}
