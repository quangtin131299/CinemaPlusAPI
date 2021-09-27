import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rapphim } from 'Models/entities/Rapphim';
import { CinemasController } from './cinemas.controller';
import { CinemasService } from './cinemas.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rapphim])],
  controllers:[CinemasController],
  providers: [CinemasService]
})
export class CinemasModule {}
