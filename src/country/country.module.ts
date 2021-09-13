import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vungmien } from 'DTO/entities/Vungmien';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';

@Module({
    imports: [TypeOrmModule.forFeature([Vungmien])],
    controllers: [CountryController],
    providers: [CountryService],
})
export class CountryModule {}
