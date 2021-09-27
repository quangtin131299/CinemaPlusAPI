import { Controller, Get } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PopcornService } from './popcorn.service';

@ApiTags('Popcorn')
@Controller('popcorn')
export class PopcornController {

    constructor(private popcornService: PopcornService){}

    @Get('/getallpopcorn')
    @ApiOkResponse({description: 'Get all popcorn.' })
    @ApiNotFoundResponse({description: 'Not Found.'})
    getAllPopCorn(){
        return this.popcornService.getAllPopCorn();
    }

}
