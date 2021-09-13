import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phong } from 'DTO/entities/Phong';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';

@Module({
  imports: [TypeOrmModule.forFeature([Phong])],
  controllers: [RoomController],
  providers: [RoomService]
})
export class RoomModule {}
