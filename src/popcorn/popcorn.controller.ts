import { Controller, Get } from '@nestjs/common';
import { PopcornService } from './popcorn.service';

@Controller('popcorn')
export class PopcornController {

    constructor(private popcornService: PopcornService){}

    @Get('/getallpopcorn')
    getAllPopCorn(){
        return this.popcornService.getAllPopCorn();
    }

}
