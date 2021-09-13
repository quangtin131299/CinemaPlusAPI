import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bapnuoc } from 'DTO/entities/Bapnuoc';
import { PopcornController } from './popcorn.controller';
import { PopcornService } from './popcorn.service';

@Module({
    imports:[TypeOrmModule.forFeature([Bapnuoc])],
    controllers: [PopcornController],
    providers: [PopcornService]
})
export class PopcornModule {}
