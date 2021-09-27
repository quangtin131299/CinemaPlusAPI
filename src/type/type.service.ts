import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Loaiphim } from 'Models/entities/Loaiphim';
import { Repository } from 'typeorm';

@Injectable()
export class TypeService {

    constructor(@InjectRepository(Loaiphim) private typeRepository: Repository<Loaiphim>){}


    getAllType(): Promise<Loaiphim[]>{
        return this.typeRepository.find();
    }

}
