import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { Quocgia } from 'DTO/entities/Quocgia';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';

@Module({
    imports: [TypeOrmModule.forFeature([])],
    controllers: [CountryController],
    providers: [CountryService],
})
export class CountryModule {}
