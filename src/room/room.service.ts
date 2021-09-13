import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Phong } from 'DTO/entities/Phong';
import { Repository } from 'typeorm';

@Injectable()
export class RoomService {

    constructor(@InjectRepository(Phong) private roomRepository: Repository<Phong>){}

    getRoomOfNowMovie(idMovie: number, idShowTime: number, currentDate: string, idCinema: number): Promise<Phong>{
        return this.roomRepository.createQueryBuilder('room')
                .innerJoinAndSelect('room.idRap2', 'cinema')
                .innerJoinAndSelect('room.phimPhongXuats','detailroom')
                .innerJoinAndSelect('detailroom.idPhim2', 'movie')
                .innerJoinAndSelect('detailroom.idXuatChieu2', 'showtime')
                .where('detailroom.ngay = :currentdate', {currentdate: currentDate})
                .andWhere('cinema.id = :idcinema', {idcinema: idCinema})
                .andWhere('movie.id = :idmovie', {idmovie: idMovie})
                .andWhere('showtime.id = :idshowtime', {idshowtime: idShowTime})
                .select(['room.id', 'room.tenPhong'])
                .getOne();
    }

}
