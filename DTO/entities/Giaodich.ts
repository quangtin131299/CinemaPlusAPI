import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Khachhang } from "./Khachhang";

@Index("Id_KhachHang", ["idKhachHang"], {})
@Entity("giaodich", { schema: "cinemaplus" })
export class Giaodich {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("text", { name: "NoiDung" })
  noiDung: string;

  @Column("date", { name: "NgayGiaoDich" })
  ngayGiaoDich: string;

  @Column("int", { name: "Id_KhachHang" })
  idKhachHang: number;

  @ManyToOne(() => Khachhang, (khachhang) => khachhang.giaodiches, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "Id_KhachHang", referencedColumnName: "id" }])
  idKhachHang2: Khachhang;
}
