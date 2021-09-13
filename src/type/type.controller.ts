import { Controller, Get } from '@nestjs/common';
import { Loaiphim } from 'DTO/entities/Loaiphim';
import { TypeService } from './type.service';

@Controller('type')
export class TypeController {

    constructor(private typeService: TypeService){}

    @Get('/getalltype')
    getAllType(): Promise<Loaiphim[]>{
        return this.typeService.getAllType();
    }

}
