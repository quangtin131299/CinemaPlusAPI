import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Binhluan } from "./Binhluan";
import { Giaodich } from "./Giaodich";
import { Hoadon } from "./Hoadon";
import { KhachhangPhim } from "./KhachhangPhim";
import { Vedat } from "./Vedat";

@Index("Account", ["taiKhoan"], { unique: true })
@Index("IDX_e5e7417d09341dedd253bb2264", ["taiKhoan"], { unique: true })
@Entity("khachhang", { schema: "datvephim" })
export class Khachhang {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("varchar", { name: "HoTen", length: 200 })
  hoTen: string;

  @Column("varchar", { name: "Email", nullable: true, length: 200 })
  email: string | null;

  @Column("date", { name: "NgaySinh", nullable: true })
  ngaySinh: string | null;

  @Column("varchar", { name: "SDT", length: 200 })
  sdt: string;

  @Column("varchar", { name: "TaiKhoan", unique: true, length: 200 })
  taiKhoan: string;

  @Column("varchar", { name: "MatKhau", length: 200 })
  matKhau: string;

  @Column("date", { name: "NgayDangKy" })
  ngayDangKy: string;

  @Column("text", { name: "AnhDaiDien", nullable: true })
  anhDaiDien: string | null;

  @OneToMany(() => Binhluan, (binhluan) => binhluan.idKhachHang2)
  binhluans: Binhluan[];

  @OneToMany(() => Giaodich, (giaodich) => giaodich.idKhachHang2)
  giaodiches: Giaodich[];

  @OneToMany(() => Hoadon, (hoadon) => hoadon.idKhachHang2)
  hoadons: Hoadon[];

  @OneToMany(() => KhachhangPhim, (khachhangPhim) => khachhangPhim.idKhachHang2)
  khachhangPhims: KhachhangPhim[];

  @OneToMany(() => Vedat, (vedat) => vedat.idKhachHang2)
  vedats: Vedat[];
}
