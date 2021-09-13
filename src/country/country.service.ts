import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { Quocgia } from 'DTO/entities/Quocgia';
import { Repository } from 'typeorm';

@Injectable()
export class CountryService {

    constructor(private countryRepository: Repository<any>) {}


    getCountryMovie(): Promise<any>{
        return null;
        // return [] this.countryRepository.createQueryBuilder('country')
        //             .innerJoinAndSelect('country.phims', 'movie')
        //             .select('country.id')
        //             .addSelect('country.tenQuocGia')
        //             .getMany()
    }

}
