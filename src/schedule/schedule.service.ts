import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lichchieu } from 'DTO/entities/Lichchieu';
import { Repository } from 'typeorm';

@Injectable()
export class ScheduleService {
  
    constructor(
        @InjectRepository(Lichchieu)
        private scheduleRepository: Repository<Lichchieu>,
    ) { }

     getScheduleByCinema(idCinema: number, currentDate: string, idMovie: number): Promise<Lichchieu> {
        return this.scheduleRepository.createQueryBuilder('schedule')
            .innerJoinAndSelect('schedule.phimLichchieus', 'movieschedule')
            .innerJoinAndSelect('movieschedule.idSuatchieu2', 'time')
            .innerJoinAndSelect('movieschedule.idPhim2', 'movie')
            .where('schedule.idRap = :idcinema', { idcinema: idCinema })
            .andWhere('movieschedule.idPhim = :idmovie', { idmovie: idMovie })
            .andWhere('schedule.ngay = :currentdate', {currentdate: currentDate})
            .orderBy('time.gio')
            .getOne();
    }

    getScheduleOfDate(idcinema: number ,date: string): Promise<Lichchieu>{
        return this.scheduleRepository.createQueryBuilder('schedule')
                    .innerJoinAndSelect('schedule.phimLichchieus', 'detailschedule')
                    .innerJoinAndSelect('detailschedule.idSuatchieu2', 'time')
                    .innerJoinAndSelect('detailschedule.idPhim2', 'movie')
                    .innerJoinAndSelect('schedule.idRap2', 'cinema')
                    .where('schedule.ngay = :scheduledate', {scheduledate: date})
                    .andWhere('cinema.id = :idcinema', {idcinema: idcinema})
                    .getOne();
    }


    async getShowTimeOfMovie(movies: any[], currentTime: string, currentDate: string): Promise<any[]>{        
        let resultShowTime = [];
        let countMovie = movies.length;

        for (let i = 0; i < countMovie; i++) {        
            let showTimeOfMovie = await this.scheduleRepository.createQueryBuilder('schedule')
                                    .innerJoinAndSelect('schedule.phimLichchieus', 'movieschedule')
                                    .innerJoinAndSelect('movieschedule.idSuatchieu2', 'time')
                                    .innerJoinAndSelect('movieschedule.idPhim2', 'movie')
                                    .innerJoinAndSelect('schedule.idRap2', 'cinema')
                                    .where('schedule.ngay >= :currentdate', {currentdate: currentDate})
                                    .andWhere('movieschedule.idPhim = :idmovie', { idmovie: movies[i].id})
                                    .andWhere('time.gio >= :currenttime', {currenttime: currentTime})
                                    .getOne();
        
            if(showTimeOfMovie){
                let showTimeMovieCustom = {
                    idMovie: showTimeOfMovie.phimLichchieus[0].idPhim,
                    idShowTime: showTimeOfMovie.phimLichchieus[0].idSuatchieu2.id,
                    time: showTimeOfMovie.phimLichchieus[0].idSuatchieu2.gio,
                    idCinema: showTimeOfMovie.idRap2.id,
                    nameCinema: showTimeOfMovie.idRap2.tenRap
                }

                resultShowTime.push(showTimeMovieCustom);
            }
  
        }
    
        return resultShowTime;
    }


}

