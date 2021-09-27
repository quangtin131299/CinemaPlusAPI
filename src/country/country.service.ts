import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vungmien } from 'Models/entities/Vungmien';
import { Repository } from 'typeorm';

@Injectable()
export class CountryService {

    constructor(@InjectRepository(Vungmien) private countryRepository: Repository<Vungmien>) {}


    getCountryMovie(): Promise<any>{
        
        return this.countryRepository.createQueryBuilder('country')
                    .innerJoinAndSelect('country.phims', 'movie')
                    .select('country.id')
                    .addSelect('country.tenQuocGia')
                    .getMany()
    }

}
