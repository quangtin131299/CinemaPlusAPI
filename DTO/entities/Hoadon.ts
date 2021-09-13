import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Khachhang } from "./Khachhang";
import { HoadonBapnuoc } from "./HoadonBapnuoc";
import { Vedat } from "./Vedat";

@Index("ID_KhachHang", ["idKhachHang"], {})
@Entity("hoadon", { schema: "cinemaplus" })
export class Hoadon {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("date", { name: "Ngay" })
  ngay: string;

  @Column("int", { name: "ID_KhachHang" })
  idKhachHang: number;

  @Column("varchar", {
    name: "TrangThai",
    length: 50,
    default: () => "'Chưa thanh toán'",
  })
  trangThai: string;

  @Column("varchar", { name: "PTThanhToan", nullable: true, length: 50 })
  ptThanhToan: string | null;

  @Column("int", { name: "SoLuongVe", nullable: true })
  soLuongVe: number | null;

  @Column("int", { name: "ThanhTienVe", nullable: true })
  thanhTienVe: number | null;

  @ManyToOne(() => Khachhang, (khachhang) => khachhang.hoadons, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "ID_KhachHang", referencedColumnName: "id" }])
  idKhachHang2: Khachhang;

  @OneToMany(() => HoadonBapnuoc, (hoadonBapnuoc) => hoadonBapnuoc.idHoaDon2)
  hoadonBapnuocs: HoadonBapnuoc[];

  @OneToMany(() => Vedat, (vedat) => vedat.idHoaDon2)
  vedats: Vedat[];
}
