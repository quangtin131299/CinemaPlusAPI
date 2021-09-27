import { Controller, Get } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Loaiphim } from 'Models/entities/Loaiphim';
import { TypeService } from './type.service';

@ApiTags('Movie Type')
@Controller('type')
export class TypeController {

    constructor(private typeService: TypeService){}

    @Get('/getalltype')
    @ApiOkResponse({description: 'Get all type.'})
    @ApiNotFoundResponse({description: 'Not Found'})
    getAllType(): Promise<Loaiphim[]>{
        return this.typeService.getAllType();
    }

}
