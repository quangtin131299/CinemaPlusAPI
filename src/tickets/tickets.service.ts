import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vedat } from 'Models/entities/Vedat';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class TicketsService {
 
  constructor(
    @InjectRepository(Vedat) private tickerRepository: Repository<Vedat>,
  ) {}

  getYourTicker(idcustomer: number, currentDate: string): Promise<Vedat[]> {
    return this.tickerRepository
      .createQueryBuilder('ticker')
      .innerJoinAndSelect('ticker.idPhong2', 'phong')
      .innerJoinAndSelect('ticker.idHoaDon2', 'hoadon')
      .innerJoinAndSelect('ticker.idRap2', 'rap')
      .innerJoinAndSelect('ticker.idKhachHang2', 'khachhang')
      .innerJoinAndSelect('ticker.idSuat2', 'suat')
      .innerJoinAndSelect('ticker.idPhim2', 'phim')
      .innerJoinAndSelect('ticker.idGhe2','ghe')
      .where('khachhang.id = :idcustomer', {idcustomer: idcustomer})
      .andWhere('ticker.ngayDat >= :currentDate', {currentDate: currentDate})
      .andWhere('ticker.trangThai = :status', {status: 'Đã đặt'})
      .orderBy('ticker.ngayDat', 'DESC')
      .addOrderBy('suat.gio', 'ASC')
      .getMany();
  }

  addNewTicker(newTicker: Vedat): Promise<Vedat>{
    return this.tickerRepository.save(newTicker);
  }

  async addRangeNewTicker(tickers: any[], idBill: number): Promise<void>{
    let countTicker = tickers.length;
    
    for(let i = 0; i < countTicker; i++){
       let newTicker = new Vedat();
       newTicker.idGhe = tickers[i].idSeat;
       newTicker.idKhachHang = tickers[i].idCustomer;
       newTicker.idHoaDon = idBill;
       newTicker.idPhim = tickers[i].idMovie;
       newTicker.idPhong = tickers[i].idRoom;
       newTicker.idRap = tickers[i].idCinema;
       newTicker.ngayDat = tickers[i].bookingDate;
       newTicker.idSuat = tickers[i].idShowTime;
       newTicker.trangThai = tickers[i].status;
       newTicker.giaVe = tickers[i].unitPrice;

      await this.addNewTicker(newTicker);
    }

    return;

  }

  updateStatusCancelTicker(idTicker: number): Promise<UpdateResult>{
      return this.tickerRepository.update({id: idTicker}, {trangThai: 'Đã hủy'});
  }

  async updateStatusAcceptTicker(idTicker){
    return await this.tickerRepository.update({id: idTicker}, {trangThai: 'Không nhận vé'});
  }

  async getTickerExpired(idCustomer, currentTime, currentDate): Promise<Vedat[]>{
    return await this.tickerRepository.createQueryBuilder('ticker')
                  .leftJoinAndSelect('ticker.idKhachHang2', 'customer')
                  .leftJoinAndSelect('ticker.idSuat2', 'showtime')
                  .where('customer.id = :idcusomter', {idcusomter: idCustomer})
                  .andWhere('ticker.ngayDat = :currentDate', {currentDate: currentDate})
                  .andWhere('showtime.gio < :currentTime', {currentTime: currentTime})
                  .andWhere('ticker.trangThai = :status', {status: 'Đã đặt'})
                  .getMany();
                  
  }

}
