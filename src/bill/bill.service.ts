import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hoadon } from 'Models/entities/Hoadon';
import { HoadonBapnuoc } from 'Models/entities/HoadonBapnuoc';
import { Repository } from 'typeorm';

@Injectable()
export class BillService {

    constructor(@InjectRepository(Hoadon) private billRepository: Repository<Hoadon> 
              , @InjectRepository(HoadonBapnuoc) private billPopCorn: Repository<HoadonBapnuoc>){}

    addNewBill(newBill: Hoadon): Promise<Hoadon>{
        return this.billRepository.save(newBill);
    }

    async addBillPopCorn(popCorns :any[], idBill: number): Promise<void>{
        
        let countPopCorn = popCorns.length;

        for(let j = 0; j < countPopCorn; j++){        
            let newDetailbill = new HoadonBapnuoc();
            newDetailbill.idHoaDon = idBill;
            newDetailbill.idBapNuoc = popCorns[j].id;
            newDetailbill.soLuong = popCorns[j].soLuong;
            newDetailbill.thanhTien = this.calulatorAmountPopCorn(popCorns[j].soLuong ,popCorns[j].donGia);
            
            await this.billPopCorn.save(newDetailbill);
        }

        return;
    }

    calulatorAmountPopCorn(countPopCorn: number, unitPrice: number):number{
        return countPopCorn * unitPrice;
    }


    getAllBillByCustomerId(idCustomer: number): Promise<Hoadon[]>{
        return this.billRepository.createQueryBuilder('bill')
                    .innerJoinAndSelect('bill.vedats', 'tickers')
                    .leftJoinAndSelect('bill.hoadonBapnuocs', 'detailBill')
                    .leftJoinAndSelect('detailBill.idBapNuoc2', 'popcorns')
                    .innerJoinAndSelect('bill.idKhachHang2', 'customer')
                    .innerJoinAndSelect('tickers.idGhe2', 'seat')
                    .innerJoinAndSelect('tickers.idPhim2', 'movies')
                    .innerJoinAndSelect('tickers.idRap2', 'cinema')
                    .innerJoinAndSelect('tickers.idSuat2', 'showtime')
                    .where('customer.id = :idcustomer', {idcustomer: idCustomer})
                    .getMany();
    }

}
