import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Khachhang } from 'DTO/entities/Khachhang';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class AuthencationService {
  constructor(
    @InjectRepository(Khachhang)
    private custormerRepository: Repository<Khachhang>,
  ) {}

  loginCustomer(username: string, password: string): Promise<Khachhang> {
    return this.custormerRepository
      .createQueryBuilder('customer')
      .where('customer.taiKhoan = :username', { username: username })
      .andWhere('customer.matKhau = :password', { password: password })
      .getOne();
  }

  register(customer: Khachhang): Promise<Khachhang> {
    return this.custormerRepository.save({
      hoTen: customer.hoTen,
      ngayDangKy: customer.ngayDangKy,
      ngaySinh: customer.ngaySinh == '' ? null : customer.ngaySinh,
      email: customer.email,
      taiKhoan: customer.taiKhoan,
      matKhau: customer.matKhau,
      sdt: customer.sdt
    });
  }

  async validateNPhoneAndEmail(email: string, phone: string): Promise<Khachhang> {
    let result = await this.custormerRepository
      .createQueryBuilder('customer')
      .where('customer.email = :inputEmail', { inputEmail: email })
      .orWhere('customer.sdt = :inputPhone', { inputPhone: phone })
      .getOne();

    return result;
  }

  async updateInforCustomer(customer: Khachhang): Promise<UpdateResult> {
     let resultUpdate = await this.custormerRepository.update({id: customer.id}, {
        hoTen: customer.hoTen,
        ngaySinh: customer.ngaySinh == '' ? null : customer.ngaySinh,
        sdt: customer.sdt
      });

      return resultUpdate;
  }

  async updateProfileImage(idCustomer: number,imgUrl: string): Promise<UpdateResult>{
    let resultUpdate = await this.custormerRepository.update({id: idCustomer}, {
      anhDaiDien: imgUrl
    });

    return resultUpdate
  }

  async updatePassCustomer(idCustomer: number, newPass: string): Promise<UpdateResult>{
    let resultUpdate = await this.custormerRepository.update({id: idCustomer}, {matKhau: newPass});

    return resultUpdate;
  }
}
