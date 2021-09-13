import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Phim } from 'DTO/entities/Phim';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(@InjectRepository(Phim) private movieRepository: Repository<Phim>) { }

  getMovieNowShowing(): Promise<any[]> {
    return this.movieRepository
      .createQueryBuilder('movie')
      .innerJoinAndSelect('movie.loaiphims', 'movieTypes')
      .where('movie.trangThai = :status', { status: 'Đang chiếu' })
      .getMany();
  }

  getMovieFavorite(): Promise<Phim[]> {
    return this.movieRepository
      .createQueryBuilder('movie')
      .orderBy('movie.luocThich', 'DESC')
      .limit(3)
      .getMany();
  }

  getNewMovie(idMovie: number):Promise<Phim>{
    return this.movieRepository 
              .createQueryBuilder('movie')
              .innerJoinAndSelect('movie.loaiphims', 'movieTypes')
              .where('movie.id = :idmovie', { idmovie: idMovie })
              .getOne();
  }

  getViewCountOfMovie(): Promise<any[]> {
    return this.movieRepository
      .createQueryBuilder('movie').groupBy('movie.id')
      .leftJoinAndSelect('movie.vedats', 'tickers')
      .where('movie.trangThai = :status', { status: 'Đang chiếu' })
      .select('COUNT(tickers.id)', 'luocxem')
      .addSelect('movie.id', 'id')
      .getRawMany();

  }

  getMovieComingSoon() {
    return this.movieRepository.createQueryBuilder('movie')
      .innerJoinAndSelect('movie.loaiphims', 'movieTypes')
      .where('movie.trangThai = :status', { status: 'Sắp chiếu' })
      .getMany();
  }

  async searchMovieNowShow(keyWord: string, typeName: string, countryName: string, cinemaName: string, isFilter: number): Promise<Phim[]> {
    let resultReturn = [];
    let resultSearchMovieNowShow = [];

    if(isFilter == 1){
      resultSearchMovieNowShow = await this.movieRepository.createQueryBuilder('movie')
              .innerJoinAndSelect('movie.loaiphims', 'movieTypes')
              .innerJoinAndSelect('movie.idQuocGia2', 'country')
              .innerJoinAndSelect('movie.rapphims', 'cinema')
              .where(`movie.trangThai = :status and movie.tenPhim like :keyword and (cinema.tenRap like :cinemaname and movieTypes.tenLoai like :typename and country.tenQuocGia like :contryname)`
                    , { keyword: `${keyWord}%`,
                        contryname: `${countryName}%`,
                        typename: `${typeName}%`,
                        cinemaname: `${cinemaName}%`,
                        status: 'Đang chiếu'})
              .getMany();
    }else{
      resultSearchMovieNowShow = await this.movieRepository.createQueryBuilder('movie')
              .where('movie.trangThai = :status', { status: 'Đang chiếu' })
              .andWhere('movie.tenPhim like :keyword', { keyword: `%${keyWord}%` })    
              .getMany();
    }
    
    let countMovie = resultSearchMovieNowShow.length;

    for (let i = 0; i < countMovie; i++) {

      let movie = await this.movieRepository
        .createQueryBuilder('movie')
        .innerJoinAndSelect('movie.loaiphims', 'movieTypes')
        .where('movie.trangThai = :status', { status: 'Đang chiếu' })
        .andWhere('movie.id = :idmovie', { idmovie: resultSearchMovieNowShow[i].id })
        .getOne();

      resultReturn.push(movie)
    }

    return resultReturn;
  }

  async searchMovieComingSoon(keyWord: string, typeId: string, countryId: string, isFilter: number ): Promise<Phim[]> {
    let resultReturn = [];
    let resultSearchMovieNowShow =[];

    if (isFilter == 1) {
      resultSearchMovieNowShow = await this.movieRepository.createQueryBuilder('movie')
        .where('movie.trangThai = :status', { status: 'Sắp chiếu' })
        .andWhere('movie.tenPhim like :keyword', { keyword: `${keyWord}%` })
        .getMany();
    } else {
      resultSearchMovieNowShow = await this.movieRepository.createQueryBuilder('movie')
        .innerJoinAndSelect('movie.loaiphims', 'movieTypes')
        .where('movie.trangThai = :status', { status: 'Sắp chiếu' })
        .andWhere('movie.tenPhim like :keyword', { keyword: `%${keyWord}%` })
        .andWhere('country.id = :idcountry', { idcountry: countryId })
        .andWhere('movieTypes.id = :idmovietype', { idmovietype: typeId })
        .getMany();
    }
    
    let countMovie = resultSearchMovieNowShow.length

    for (let i = 0; i < countMovie; i++) {

      let movie = await this.movieRepository
        .createQueryBuilder('movie')
        .innerJoinAndSelect('movie.loaiphims', 'movieTypes')
        .where('movie.trangThai = :status', { status: 'Sắp chiếu' })
        .andWhere('movie.id = :idmovie', { idmovie: resultSearchMovieNowShow[i].id })
        .getOne();

      resultReturn.push(movie);
    }

    return resultReturn;
  }

  getMovieByCinemaId(idCinema: number): Promise<Phim[]> {
    return this.movieRepository.createQueryBuilder('movie')
      .innerJoinAndSelect('movie.rapphims', 'cinema')
      .where('cinema.id = :idcinema', { idcinema: idCinema })
      .getMany();
  }

  getMovieOfTicker(idCustomer: number): Promise<any[]>{
    return this.movieRepository.createQueryBuilder('movie')
                .innerJoinAndSelect('movie.vedats', 'ticker')
                .innerJoinAndSelect('ticker.idKhachHang2', 'customer')
                .where('customer.id = :idcustomer', {idcustomer: idCustomer})
                .groupBy('movie.tenPhim')
                .select(['movie.id', 'movie.tenPhim'])
                .getMany();
  }

  async searchAllMovie(keyWord: string, typeName: string, countryName: string, cinemaName: string): Promise<Phim[]> {
    let resultReturn = [];
    let resultSearchMovieNowShow = [];

    resultSearchMovieNowShow = await this.movieRepository.createQueryBuilder('movie')
      .innerJoinAndSelect('movie.loaiphims', 'movieTypes')
      .innerJoinAndSelect('movie.idQuocGia2', 'country')
      .innerJoinAndSelect('movie.rapphims', 'cinema')
      .where(`(match(movie.tenPhim) against(:keyword) or movie.tenPhim like :keyword) and (cinema.tenRap like :cinemaname and movieTypes.tenLoai like :typename and country.tenQuocGia like :contryname)`
        , {
          keyword: `%${keyWord}%`,
          contryname: `${countryName}%`,
          typename: `${typeName}%`,
          cinemaname: `${cinemaName}%`,
        })
      .getMany();
           
    let countMovie = resultSearchMovieNowShow.length;

    for (let i = 0; i < countMovie; i++) {

      let movie = await this.movieRepository
        .createQueryBuilder('movie')
        .innerJoinAndSelect('movie.loaiphims', 'movieTypes')
        .where('movie.id = :idmovie', { idmovie: resultSearchMovieNowShow[i].id })
        .getOne();

      resultReturn.push(movie)
    }

    return resultReturn;
  }

}