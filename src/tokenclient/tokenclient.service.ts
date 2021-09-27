import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tokenclient } from 'Models/entities/Tokenclient';
import { Repository } from 'typeorm';

@Injectable()
export class TokenclientService {

    constructor(@InjectRepository(Tokenclient) private tokenClientRepository: Repository<Tokenclient>){}


    addNewClientToken(newToken: string):Promise<any>{
        let token = new Tokenclient();
        token.token = newToken;

        return this.tokenClientRepository.save(token);
    }

    async checkExistToken(token: string): Promise<boolean>{

        let result = await this.tokenClientRepository.findOne({token: token});

        if(result != null){
            return true;
        }

        return false;
    }
    

}
