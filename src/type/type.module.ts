import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loaiphim } from 'DTO/entities/Loaiphim';
import { TypeController } from './type.controller';
import { TypeService } from './type.service';

@Module({
  imports: [TypeOrmModule.forFeature([Loaiphim])],
  controllers:[TypeController],
  providers: [TypeService]
})
export class TypeModule {}
