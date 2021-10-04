import { Body, Controller, Get, HttpStatus, Put, Query, Res } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Phim } from 'Models/entities/Phim';
import { ScheduleService } from 'src/schedule/schedule.service';
import { MoviesService } from './movies.service';


@ApiTags('Movie')
@Controller('movies')
export class MoviesController {

    constructor(private movieService : MoviesService, private scheduleService: ScheduleService){}

  
    @Get('/getallmovie')
    @ApiOkResponse({description: 'Get all coming soon movie and show now movie.'})
    @ApiNotFoundResponse({description: 'Not Found'})
    async getAllMovie(@Query('currentTime') currentTime:string, @Query('currentDate') currentDate:string ): Promise<any[]>{
       let movies = await this.movieService.getMovieNowShowing();
       let viewCountMovie = await this.movieService.getViewCountOfMovie();
       let firstShowTimeMovie = await this.scheduleService.getShowTimeOfMovie(movies, currentTime, currentDate);
       let resultCustomMovies = this.customFieldForMovie(movies,viewCountMovie, firstShowTimeMovie);
              
       return resultCustomMovies.sort((a,b)=> 0 - (a.luocXem > b.luocXem ? 1 : -1));//DESC
    }

    @Get('/getmoviecomingsoon')
    @ApiOkResponse({description: 'Get all coming soon movie and show now movie.'})
    @ApiNotFoundResponse({description: 'Not Found.'})
    getMovieComingSoon(): Promise<Phim[]>{
        return this.movieService.getMovieComingSoon();
    }

    @Get('/getfavorite')
    @ApiOkResponse({description: 'Get all coming soon movie and show now movie.'})
    @ApiNotFoundResponse({description: 'Not Found.'})
    getMovieFavorite(): Promise<Phim[]> {
        return this.movieService.getMovieFavorite();
    }

    @Get("/getviewcountofMovie")
    @ApiOkResponse({description: 'Get all coming soon movie and show now movie.'})
    @ApiNotFoundResponse({description: 'Not Found.'})
    getViewCountOfMovie(): Promise<Object[]>{
        return this.movieService.getViewCountOfMovie();
    }

    @Get('/getnewmovie')
    @ApiOkResponse({description: 'Get all coming soon movie and show now movie.'})
    @ApiNotFoundResponse({description: 'Not Found.'})
    getNewMovie(@Query('idMovie') idMovie: number):Promise<Phim>{
        return this.movieService.getNewMovie(idMovie);
    }

    initViewCount(movies: any[]){
        let lengthMovie = movies.length;
        
        for(let i=0; i < lengthMovie; i++){
            movies[i].luocXem = 0;
        }
    }

    customFieldForMovie(movies: any[], viewCountMovie: any[], fristShowTimeCurrent: any[]): any[]{
        let lengthMovie = movies.length;
        let lengthViewCountMovie = viewCountMovie.length;
        let lengthFirstShowTime = fristShowTimeCurrent.length;

        this.initViewCount(movies);
    
        for(let i = 0; i < lengthViewCountMovie; i++){
            for(let j =0 ; j < lengthMovie; j++){
                if(movies[j].id === viewCountMovie[i].id){
                    movies[j].luocXem = viewCountMovie[i].luocxem;
                    break;
                }
            }
        }

        for(let i = 0; i < lengthFirstShowTime; i++){
            for(let j = 0; j < lengthMovie; j++){
                if(movies[j].id ===  fristShowTimeCurrent[i].idMovie){
                    movies[j].nameCinema = fristShowTimeCurrent[i].nameCinema;
                    movies[j].time = fristShowTimeCurrent[i].time;
                    movies[j].idShowTime = fristShowTimeCurrent[i].idShowTime;
                    movies[j].idCinema = fristShowTimeCurrent[i].idCinema
                }
            }
        }

        
        return movies;
    }

    @Get('/searchmovie')
    @ApiOkResponse({description: 'Get all coming soon movie and show now movie.'})
    @ApiNotFoundResponse({description: 'Not Found.'})
    searchMovieNowShow(@Query('keyWord') keyWord: string
                       , @Query('typeName') typeName: string
                       , @Query('countryName') contryName: string
                       , @Query('isMovieNowShow') isMovieNowShow: number
                       , @Query('cinemaName') cinemaName: string
                       , @Query('isFilter') isFilter: number ):Promise<Phim[]>{    
                        
        if(isMovieNowShow == 1){
            return this.movieService.searchMovieNowShow(keyWord, typeName, contryName, cinemaName, isFilter);
        }else{
            return this.movieService.searchMovieComingSoon(keyWord, typeName, contryName, isFilter);
        }
        
    }

    @Get('/getallmoviebycinemaid')
    @ApiOkResponse({description: 'Get all coming soon movie and show now movie.'})
    @ApiNotFoundResponse({description: 'Not Found.'})
    getAllMovieByCinemaId(@Query('idCinema') idCinema: number): Promise<Phim[]>{
        return this.movieService.getMovieByCinemaId(idCinema);
    }


    @Get('/getmovieofticker')
    @ApiOkResponse({description: 'Get all coming soon movie and show now movie.'})
    @ApiNotFoundResponse({description: 'Not Found.'})
    getMovieOfTicker(@Query('idCustomer') idCustomer : number): Promise<any[]>{
        return this.movieService.getMovieOfTicker(idCustomer);
    }


    @Get('/searchallmovie')
    @ApiOkResponse({description: 'Get all coming soon movie and show now movie.'})
    @ApiNotFoundResponse({description: 'Not Found.'})
    searchAllMovie(@Query('keyWord') keyWord: string
                    , @Query('typeName') typeName: string
                    , @Query('countryName') contryName: string
                    , @Query('cinemaName') cinemaName: string): Promise<Phim[]>{


        return this.movieService.searchAllMovie(keyWord, typeName, contryName,cinemaName);
    }
    
    @Put('/incrementmovie')
    @ApiOkResponse({description: 'Increment number like of movie'})
    @ApiNotFoundResponse({description: 'Not Found.'})
    async incrementLikeMovie(@Body() data: any, @Res() res: Response): Promise<Response> {
        let idCustomer = data.idCustomer;
        let idMovie = data.idMovie;
        let resultUpdateLike = await this.movieService.incrementLikeMovie(idMovie, idCustomer);
        
        if(resultUpdateLike.affected != 0){
            return res.status(HttpStatus.OK).json({
                mess: 'Success',
                statusCode: 1
            })
        }

        return res.status(HttpStatus.BAD_REQUEST).json({
            mess: 'Fail',
            statusCode: 0
        })
    }

    @Get('/checkcustomerlike')
    @ApiOkResponse({description: 'Check customer was liked movie'})
    @ApiNotFoundResponse({description: 'Not Found.'})
    async checkCustomerLike(@Query('idCustomer') idCustomer: number, @Query('idMovie') idMovie: number, @Res() res:Response):Promise<Response> {
        let resultCheck = await this.movieService.checkCustomerLikeMovie(idCustomer, idMovie);
        
        if(resultCheck == true){
            return res.status(HttpStatus.OK).json({
                mess: 'Success',
                statusCode: 1
            })
        }
        
        return res.status(HttpStatus.BAD_REQUEST).json({
            mess: 'Fail',
            statusCode: 0
        });
    }
}
