import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rapphim } from 'Models/entities/Rapphim';
import { Repository } from 'typeorm';

@Injectable()
export class CinemasService {

    constructor(@InjectRepository(Rapphim) private cinemaRepository: Repository<Rapphim>){}

    getAllCinema(): Promise<Rapphim[]>{
        return this.cinemaRepository.find();
    }

    getCinemaByMovieId(idMovie: number): Promise<Rapphim[]>{
        return this.cinemaRepository.createQueryBuilder('cinema')
            .innerJoinAndSelect('cinema.phims', 'movie')
            .where('movie.id = :idmovie', {idmovie: idMovie })
            .select(['cinema.id', 'cinema.tenRap', 'cinema.hinh', 'cinema.kinhDo', 'cinema.viDo', 'cinema.diaChi'])
            .getMany();
    }

    async getCinemaSuggestNearMe(idCinemas: any[], idMove: number): Promise<any[]> {
        
        let resultSuggestCinema = [];

        if(idCinemas && idCinemas.length != 0){
            let countIdCinemas = idCinemas.length;
            
            for (let i = 0; i < countIdCinemas; i++) {

                let cinema = await this.cinemaRepository.createQueryBuilder('cinema')
                    .innerJoinAndSelect('cinema.phims', 'movie')
                    .where('cinema.id = :idcinema', { idcinema: idCinemas[i] })
                    .andWhere('movie.id = :idmovie', {idmovie: idMove })
                    .select(['cinema.id', 'cinema.tenRap', 'cinema.hinh', 'cinema.kinhDo', 'cinema.viDo'])
                    .getOne();
                
                if (cinema) {
                    resultSuggestCinema.push(cinema);
                }
    
            }
        }
        
        return resultSuggestCinema;
    }

    async searchCinemaNearMe(keyWord: string, idCinemas: number[]): Promise<Rapphim[]> {
        let resultCinema = [];

        if(idCinemas){
            let countIdCinema = idCinemas.length;

            for (let i = 0; i < countIdCinema; i++) {
                let cinema = await this.cinemaRepository.createQueryBuilder('cinema')
                    .where('cinema.tenRap like :keyword', { keyword: `%${keyWord}%` })
                    .andWhere('cinema.id = :idcinema', { idcinema: idCinemas[i] })
                    .getOne();
    
                if (cinema) {
                    resultCinema.push(cinema);
                }
            }
        }
      
        return resultCinema;
    }

    searchAllCinema(keyWord: string): Promise<Rapphim[]> {
        return this.cinemaRepository.createQueryBuilder('cinema')
            .where('cinema.tenRap like :keyword', { keyword: `%${keyWord}%` })
            .getMany()

    }

    

}
