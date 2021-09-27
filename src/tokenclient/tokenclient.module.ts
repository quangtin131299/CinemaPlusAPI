import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tokenclient } from 'Models/entities/Tokenclient';
import { TokenclientController } from './tokenclient.controller';
import { TokenclientService } from './tokenclient.service';

@Module({
  imports:[TypeOrmModule.forFeature([Tokenclient])],
  controllers:[TokenclientController],
  providers: [TokenclientService]
})
export class TokenclientModule {}
