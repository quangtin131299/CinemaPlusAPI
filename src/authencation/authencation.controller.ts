import { Body, Controller, Get, HttpStatus, Post, Put, Query, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { Khachhang } from 'Models/entities/Khachhang';
import { Response } from 'express';
import { AuthencationService } from './authencation.service';

@ApiTags('Customer')
@Controller('authencation')
export class AuthencationController {
  private readonly NOT_ID_CUSTOMER = 0;

  constructor(
    private authencationService: AuthencationService,
    private jwtService: JwtService,
  ) {}

  @Post('/logincustomer')
  async loginCustomer(@Body() data, @Res() res:Response): Promise<any> {
    let username = data.account;
    let password = data.password;    

    let customer = await this.authencationService.loginCustomer(
      username,
      password,
    );

    if(customer && customer != null){
      const jwt = await this.jwtService.signAsync({ customerId: customer.id });

      return res.status(HttpStatus.OK).json({
        id: customer.id,
        hoTen: customer.hoTen,
        email: customer.email,
        ngaySinh: customer.ngaySinh,
        sdt: customer.sdt,
        taiKhoan: customer.taiKhoan,
        matKhau: customer.matKhau,
        ngayDangKy: customer.ngayDangKy,
        anhDaiDien: customer.anhDaiDien,
        tokenClient: jwt,
      });
    }

    return res.status(HttpStatus.OK).json({ id: this.NOT_ID_CUSTOMER });
  }

  @Post('/register')
  register(@Body() data): Promise<Khachhang> {
    let customer = new Khachhang();

    customer.hoTen = data.hoTen;
    customer.email = data.email;
    customer.ngaySinh = data.ngaySinh;
    customer.sdt = data.sdt;
    customer.taiKhoan = data.taiKhoan;
    customer.matKhau = data.matKhau;
    customer.ngayDangKy = this.getCurrentDate();

    return this.authencationService.register(customer);
  }

  @Get('/validateemailandnumberphone')
  async validateEmailAndNumberPhone(
    @Query('email') email: string,
    @Query('numberphone') numberPhone: string,
  ): Promise<Number> {
    let resultValidate = await this.authencationService.validateNPhoneAndEmail(
      email,
      numberPhone,
    );

    if (resultValidate) {
      if (resultValidate.email == email && resultValidate.sdt == numberPhone) {
        return -2;
      } else {
        if (resultValidate.email == email) {
          return -1;
        }

        if (resultValidate.sdt == numberPhone) {
          return 0;
        }
      }
    } else {
      return 1;
    }
  }

  @Put('/updateinforuser')
  async updateInforUser(@Body() dataUser: any): Promise<Khachhang> {
    try {
      let customer = new Khachhang();
      customer.hoTen = dataUser.hoTen;
      customer.ngaySinh = dataUser.ngaySinh;
      customer.sdt = dataUser.sdt;

      await this.authencationService.updateInforCustomer(dataUser);

      return customer;
    } catch (ex) {
      console.log(ex);

      return null;
    }
  }

  @Put('/updatepassword')
  async updatePassWord(@Body() data: any): Promise<any> {
    let idCustomer = data.idCustomer;
    let newPass = data.newPass;
    let resultUpdate = await this.authencationService.updatePassCustomer(
      idCustomer,
      newPass,
    );

    if (resultUpdate.affected != 0) {
      return {
        message: 'Update password of customer success',
        statusCode: 1,
      };
    }

    return {
      message: 'Update password of customer fails',
      statusCode: 0,
    };
  }

  @Get('/updateImageProfile')
  async updateImageProfile(
    @Query('idCustomer') idCustomer: number,
    @Query('imgProfileUrl') imgProfileUrl: string,
  ): Promise<number> {
    let result = await this.authencationService.updateProfileImage(
      idCustomer,
      imgProfileUrl,
    );

    if (result.affected != 0) {
      return await 1;
    }

    return await 0;
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
}
