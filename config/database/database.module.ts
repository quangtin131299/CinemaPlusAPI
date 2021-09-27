import 'dotenv/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'Models/entities/Admin';
import { Bapnuoc } from 'Models/entities/Bapnuoc';
import { Binhluan } from 'Models/entities/Binhluan';
import { Ghe } from 'Models/entities/Ghe';
import { Giaodich } from 'Models/entities/Giaodich';
import { Hoadon } from 'Models/entities/Hoadon';
import { HoadonBapnuoc } from 'Models/entities/HoadonBapnuoc';
import { Khachhang } from 'Models/entities/Khachhang';
import { Lichchieu } from 'Models/entities/Lichchieu';
import { Loaiphim } from 'Models/entities/Loaiphim';
import { Nhacungcap } from 'Models/entities/Nhacungcap';
import { Phim } from 'Models/entities/Phim';
import { PhimLichchieu } from 'Models/entities/PhimLichchieu';
import { PhimPhongXuat } from 'Models/entities/PhimPhongXuat';
import { Phong } from 'Models/entities/Phong';
import { Rapphim } from 'Models/entities/Rapphim';
import { Suatchieu } from 'Models/entities/Suatchieu';
import { Tokenclient } from 'Models/entities/Tokenclient';
import { Vedat } from 'Models/entities/Vedat';
import { Vungmien } from 'Models/entities/Vungmien';

@Module({
    imports:[
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'db4free',
        port: 3306,
        username: 'quang_tin',
        password: 'Ngolamquangtin1@',
        database: 'datvephim',
        entities: [
          Admin,
          Bapnuoc,
          Binhluan,
          Ghe,
          Giaodich,
          Hoadon,
          HoadonBapnuoc,
          Khachhang,
          Lichchieu,
          Loaiphim,
          Nhacungcap,
          Vungmien,
          Phim,
          PhimLichchieu,
          PhimPhongXuat,
          Phong,
          Rapphim,
          Suatchieu,
          Tokenclient,
          Vedat
        ],  
        synchronize: false,
      })
    ],
})
export class DatabaseModule {}
