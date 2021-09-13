import { Controller, Get, Query } from '@nestjs/common';
import { Hoadon } from 'DTO/entities/Hoadon';
import { BillService } from './bill.service';

@Controller('bill')
export class BillController {


    constructor(private billService: BillService){}

    @Get('/getallbillofcustomer')
    async getAllBillByCustomerId(@Query('idCustomer') idCustomer: number): Promise<Hoadon[]>{
        let listBill = await this.billService.getAllBillByCustomerId(idCustomer);
        let resultListBill = await this.customFieldBill(listBill);

        return resultListBill;
    }

    async customFieldBill(listBill): Promise<any[]>{
        let resultBill = [];
        let countBill = listBill.length;

        for(let i = 0; i < countBill; i++){
            let countPopcorn = listBill[i].hoadonBapnuocs.length;
            let popcorn = [];
            
            for(let j = 0; j < countPopcorn; j++){
                popcorn.push({
                    id: listBill[i].hoadonBapnuocs[j].idBapNuoc2.id,
                    tenCombo: listBill[i].hoadonBapnuocs[j].idBapNuoc2.tenCombo,
                    donGia: listBill[i].hoadonBapnuocs[j].idBapNuoc2.donGia,
                    hinh: listBill[i].hoadonBapnuocs[j].idBapNuoc2.hinh,
                    soLuong: listBill[i].hoadonBapnuocs[j].soLuong,
                    thanhTien: listBill[i].hoadonBapnuocs[j].thanhTien
                });
            }

            resultBill.push({
                id: listBill[i].id,
                ngY: listBill[i].ngay,
                thanhtien: listBill[i].thanhTienVe,
                vedats: listBill[i].vedats,
                bapnuocs: popcorn,
                ptThanhToan: listBill[i].ptThanhToan,
                trangThai: listBill[i].trangThai
            })
        }

        return resultBill;
    }

    

}

