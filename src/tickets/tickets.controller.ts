import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Put,
  Headers,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiForbiddenResponse, ApiHeader,  ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Hoadon } from 'Models/entities/Hoadon';
import { Response } from 'express';
import { BillService } from 'src/bill/bill.service';
import { SeatService } from 'src/seat/seat.service';
import { TicketsService } from './tickets.service';

@ApiTags('Ticker')
@Controller('tickets')
export class TicketsController {
  constructor(
    private ticketService: TicketsService,
    private jwtService: JwtService,
    private billService: BillService,
    private seatService: SeatService,
  ) {}

  @Get('/getyourticketbyid')
  @ApiOkResponse({description: 'Get ticker of customer'})
  @ApiNotFoundResponse({description: 'Not Found.' })
  @ApiForbiddenResponse({description: 'Forbidden.'})
  @ApiHeader({
    name: 'tokenclient',
    description: 'Token client',
  })
  async getYourTicketById(
    @Res() res: Response,
    @Headers() hearders,
    @Query('idcustomer') idcustomer: number,
    @Query('currentDate') currentDate: string,
  ): Promise<any> {
    if (hearders.tokenclient && hearders.tokenclient != '') {
      let verifyResult = await this.jwtService.verifyAsync(
        hearders.tokenclient,
      );

      if (verifyResult) {
        return await this.ticketService.getYourTicker(idcustomer, currentDate);
      } else {
        return res.status(HttpStatus.FORBIDDEN).json([]);
      }
    }else{
      
      return res.status(HttpStatus.OK).json([]);
    }
  }

  @Post('/processtickerbooking')
  @ApiOkResponse({description: 'Booking ticker'})
  @ApiNotFoundResponse({description: ''})
  async processTickerBooking(@Body() dataticker: any): Promise<any> {
    try {
      let newBill = new Hoadon();
      let tickerBookings = this.createTickerBookingsFromSeats(
        dataticker.idSeats,
        dataticker,
      );

      newBill.ngay = this.getCurrentDate();
      newBill.ptThanhToan = dataticker.methodPay;
      newBill.soLuongVe = tickerBookings.length;
      newBill.thanhTienVe = this.calulatorToalAmount(tickerBookings);
      newBill.idKhachHang = dataticker.idkhachhang;
      newBill.trangThai = 'Đã thanh toán';

      let bill = await this.billService.addNewBill(newBill);

      await this.ticketService.addRangeNewTicker(tickerBookings, bill.id);

      await this.billService.addBillPopCorn(dataticker.popcorns, bill.id);

      await this.seatService.updateStatusOfSeatBookings(dataticker.idSeats);

      return 1;
    } catch (error) {
      console.log(error);

      return 0;
    }
  }

  @Put('/updatestatuscancel')
  @ApiOkResponse({description: 'Update status ticker is cancel'})
  @ApiNotFoundResponse({description: 'Not Found'})
  async updateStatusCancel(@Body() data: any): Promise<number> {
    let resultUpdate = await this.ticketService.updateStatusCancelTicker(
      data.id,
    );

    if (resultUpdate.affected != 0) {
      let resultUpdateSeat = await this.seatService.updateStatusEmptyOfSeat(
        data.idGhe,
      );

      if (resultUpdateSeat.affected == 0) {
        return 0;
      }

      return 1;
    }

    return 0;
  }

  @Put('/gettickerexpired')
  @ApiOkResponse({description: 'Get ticker expired of customer'})
  @ApiNotFoundResponse({description: 'Not Found'})
  async getTickerExpired(@Body() data: any) {
    let listTickerExpired = await this.ticketService.getTickerExpired(
      data.idCustomer,
      data.currentTime,
      data.currentDate,
    );

    if (listTickerExpired.length != 0) {
      let countTickerExpired = listTickerExpired.length;

      for (let i = 0; i < countTickerExpired; i++) {
        await this.ticketService.updateStatusAcceptTicker(
          listTickerExpired[i].id,
        );
      }

      return {
        statusCode: 1,
        message: 'Success',
        countTicker: countTickerExpired,
      };
    } else {
      return { statusCode: 0, message: 'Not ticker' };
    }
  }

  getCurrentDate(): string {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    let currentDate = '';
    currentDate = yyyy + '-' + mm + '-' + dd;

    return currentDate;
  }

  calulatorToalAmount(tickerBooking: any[]): number {
    if (tickerBooking && tickerBooking.length != 0) {
      return tickerBooking.length * tickerBooking[0].unitPrice;
    }

    return 0;
  }

  createTickerBookingsFromSeats(
    seatBooking: any[],
    infoTickerBooking: any,
  ): any[] {
    let resultTickerBooking = [];
    let countSeat = seatBooking.length;

    for (let i = 0; i < countSeat; i++) {
      let tickerBooking = {
        idCinema: 0,
        idMovie: 0,
        idShowTime: 0,
        bookingDate: '',
        idCustomer: 0,
        idRoom: 0,
        status: '',
        unitPrice: 0,
        idSeat: 0,
        methodPay: -1,
      };

      tickerBooking.idCinema = infoTickerBooking.idrap;
      tickerBooking.idMovie = infoTickerBooking.idphim;
      tickerBooking.idShowTime = infoTickerBooking.idsuat;
      tickerBooking.bookingDate = infoTickerBooking.ngaydat;
      tickerBooking.idCustomer = infoTickerBooking.idkhachhang;
      tickerBooking.idRoom = infoTickerBooking.idphong;
      tickerBooking.status = infoTickerBooking.trangthai;
      tickerBooking.unitPrice = infoTickerBooking.unitPrice;
      tickerBooking.methodPay = infoTickerBooking.methodPay;
      tickerBooking.idSeat = seatBooking[i];

      resultTickerBooking.push(tickerBooking);
    }

    return resultTickerBooking;
  }
}
