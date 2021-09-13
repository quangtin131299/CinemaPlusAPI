import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ghe } from 'DTO/entities/Ghe';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class SeatService {
  private readonly ISGETSEATBOOKINGOFROOM: number = 1;

  constructor(@InjectRepository(Ghe) private seatRepository: Repository<Ghe>) {}

  getSeatOfRoom(
    idMovie: number,
    currentDate: string,
    idRoom: number,
    idShowTime: number,
    idCinema: number,
    isSeatBooking: number,
  ): Promise<Ghe[]> {
    if (isSeatBooking == this.ISGETSEATBOOKINGOFROOM) {
      return this.seatRepository
        .createQueryBuilder('seat')
        .innerJoinAndSelect('seat.vedats', 'tickers')
        .innerJoinAndSelect('tickers.idPhong2', 'room')
        .innerJoinAndSelect('tickers.idPhim2', 'movie')
        .innerJoinAndSelect('tickers.idSuat2', 'showtime')
        .innerJoinAndSelect('tickers.idRap2', 'cinema')
        .where('seat.trangThai = :status', { status: 'Đã đặt' })
        .andWhere('movie.id = :idmovie', { idmovie: idMovie })
        .andWhere('tickers.ngayDat = :currentDate', {
          currentDate: currentDate,
        })
        .andWhere('room.id = :idroom', { idroom: idRoom })
        .andWhere('showtime.id = :idshowtime', { idshowtime: idShowTime })
        .andWhere('cinema.id = :idcinema', { idcinema: idCinema })
        .select(['seat.id', 'seat.tenGhe', 'seat.idPhong', 'seat.trangThai'])
        .getMany();
    } else {
      return this.seatRepository
        .createQueryBuilder('seat')
        .innerJoinAndSelect('seat.idPhong2', 'room')
        .innerJoinAndSelect('room.phimPhongXuats', 'detailroom')
        .innerJoinAndSelect('room.idRap2', 'cinema')
        .where('room.id = :idroom', { idroom: idRoom })
        .andWhere('cinema.id = :idcinema', { idcinema: idCinema })
        .select(['seat.id', 'seat.tenGhe', 'seat.idPhong', 'seat.trangThai'])
        .getMany();
    }
  }

  updateStatusOfSeatBookings(seats: any[]): void {
    let countSeatBooking = seats.length;

    for (let i = 0; i < countSeatBooking; i++) {
      this.seatRepository.update(seats[i], { trangThai: 'Đã đặt' });
    }
  }

  updateStatusEmptyOfSeat(idSeat: number): Promise<UpdateResult> {
    return this.seatRepository.update({ id: idSeat }, { trangThai: 'Trống' });
  }
}
