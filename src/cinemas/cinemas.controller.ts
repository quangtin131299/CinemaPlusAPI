import { Controller, Get, Query } from '@nestjs/common';
import { Rapphim } from 'Models/entities/Rapphim';
import { CinemasService } from './cinemas.service';

@Controller('cinemas')
export class CinemasController {

    constructor(private cinemaService: CinemasService){}

    @Get("/getallcinema")
    getAllCinema(){
        return this.cinemaService.getAllCinema();
    }

    @Get("/getcinemabymovieid")
    getCinemaByMovieId(@Query('idMovie') idMovie: number): Promise<Rapphim[]>{
        return this.cinemaService.getCinemaByMovieId(idMovie);
    }

    @Get("/searchnearme")
    searchCinemaNearme(@Query('keyWord') keyWord: string , @Query('idCinemas')  idCinemas: number[]):Promise<Rapphim[]>{
        return this.cinemaService.searchCinemaNearMe(keyWord, idCinemas);    
    }

    @Get('/searchallcinema')
    searchAllCinema(@Query('keyWord') keyWord: string):Promise<Rapphim[]>{
        return this.cinemaService.searchAllCinema(keyWord);
    }

    @Get('/getcinemasuggestion')
    async getCinemaSuggestNearMe(@Query('idCinemas') idCinemas: any, @Query('idMovie') idMovie: number): Promise<any[]>{
        if(typeof idCinemas == 'string'){
            let arrIdCinema = [];
            arrIdCinema.push(idCinemas);
             
            return await this.cinemaService.getCinemaSuggestNearMe(arrIdCinema, idMovie);
        }else{
            return this.cinemaService.getCinemaSuggestNearMe(idCinemas, idMovie);
        }  
    }
}
