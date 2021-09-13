import { Controller, Get, Query } from '@nestjs/common';
import { Phim } from 'DTO/entities/Phim';
import { ScheduleService } from 'src/schedule/schedule.service';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {


    constructor(private movieService : MoviesService, private scheduleService: ScheduleService){}

    @Get('/getallmovie')
    async getAllMovie(@Query('currentTime') currentTime:string, @Query('currentDate') currentDate:string ): Promise<any[]>{
       let movies = await this.movieService.getMovieNowShowing();
       let viewCountMovie = await this.movieService.getViewCountOfMovie();
       let firstShowTimeMovie = await this.scheduleService.getShowTimeOfMovie(movies, currentTime, currentDate);
       let resultCustomMovies = this.customFieldForMovie(movies,viewCountMovie, firstShowTimeMovie);
       
       return resultCustomMovies.sort((a,b)=> 0 - (a.luocXem > b.luocXem ? 1 : -1));//DESC
    }

    @Get('/getmoviecomingsoon')
    getMovieComingSoon(): Promise<Phim[]>{
        return this.movieService.getMovieComingSoon();
    }

    @Get('/getfavorite')
    getMovieFavorite(): Promise<Phim[]> {
        return this.movieService.getMovieFavorite();
    }

    @Get("/getviewcountofMovie")
    getViewCountOfMovie(): Promise<Object[]>{
        return this.movieService.getViewCountOfMovie();
    }

    @Get('/getnewmovie')
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
    getAllMovieByCinemaId(@Query('idCinema') idCinema: number): Promise<Phim[]>{
        return this.movieService.getMovieByCinemaId(idCinema);
    }


    @Get('/getmovieofticker')
    getMovieOfTicker(@Query('idCustomer') idCustomer : number): Promise<any[]>{
        return this.movieService.getMovieOfTicker(idCustomer);
    }


    @Get('/searchallmovie')
    searchAllMovie(@Query('keyWord') keyWord: string
                    , @Query('typeName') typeName: string
                    , @Query('countryName') contryName: string
                    , @Query('cinemaName') cinemaName: string): Promise<Phim[]>{


        return this.movieService.searchAllMovie(keyWord, typeName, contryName,cinemaName);
    }
    
}
