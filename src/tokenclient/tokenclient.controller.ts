import { Body, Controller, Post } from '@nestjs/common';
import { TokenclientService } from './tokenclient.service';

@Controller('tokenclient')
export class TokenclientController {

    constructor(private tokenClientService: TokenclientService){}

    @Post('/addnewtokenclient')
    async addNewTokenClient(@Body() data: any): Promise<number>{
        let tokenExist = await this.tokenClientService.checkExistToken(data.token);

        if(tokenExist == false){
            this.tokenClientService.addNewClientToken(data.token);
        }
        
        return 0;
    }

}
