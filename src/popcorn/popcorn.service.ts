import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bapnuoc } from 'Models/entities/Bapnuoc';
import { Repository } from 'typeorm';

@Injectable()
export class PopcornService {

    constructor(@InjectRepository(Bapnuoc) private popcornRepository: Repository<Bapnuoc>){}

    getAllPopCorn(): Promise<Bapnuoc[]>{
        return this.popcornRepository.find();
    }
}
