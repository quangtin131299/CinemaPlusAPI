import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Phong } from "./Phong";
import { Hoadon } from "./Hoadon";
import { Rapphim } from "./Rapphim";
import { Khachhang } from "./Khachhang";
import { Suatchieu } from "./Suatchieu";
import { Phim } from "./Phim";
import { Ghe } from "./Ghe";

@Index("ID_Ghe", ["idGhe"], {})
@Index("ID_Phim", ["idPhim"], {})
@Index("ID_KhachHang", ["idKhachHang"], {})
@Index("ID_Rap", ["idRap"], {})
@Index("ID_Suat", ["idSuat"], {})
@Index("ID_HoaDon", ["idHoaDon"], {})
@Index("ID_Phong", ["idPhong"], {})
@Entity("vedat", { schema: "cinemaplus" })
export class Vedat {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("date", { name: "NgayDat", nullable: true })
  ngayDat: string | null;

  @Column("int", { name: "ID_Suat", nullable: true })
  idSuat: number | null;

  @Column("int", { name: "ID_Ghe", nullable: true })
  idGhe: number | null;

  @Column("int", { name: "ID_Phim", nullable: true })
  idPhim: number | null;

  @Column("int", { name: "ID_KhachHang", nullable: true })
  idKhachHang: number | null;

  @Column("int", { name: "ID_Rap", nullable: true })
  idRap: number | null;

  @Column("int", { name: "ID_HoaDon", nullable: true })
  idHoaDon: number | null;

  @Column("varchar", { name: "TrangThai", nullable: true, length: 50 })
  trangThai: string | null;

  @Column("int", { name: "ID_Phong", nullable: true })
  idPhong: number | null;

  @Column("int", { name: "GiaVe", nullable: true })
  giaVe: number | null;

  @ManyToOne(() => Phong, (phong) => phong.vedats, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "ID_Phong", referencedColumnName: "id" }])
  idPhong2: Phong;

  @ManyToOne(() => Hoadon, (hoadon) => hoadon.vedats, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "ID_HoaDon", referencedColumnName: "id" }])
  idHoaDon2: Hoadon;

  @ManyToOne(() => Rapphim, (rapphim) => rapphim.vedats, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "ID_Rap", referencedColumnName: "id" }])
  idRap2: Rapphim;

  @ManyToOne(() => Khachhang, (khachhang) => khachhang.vedats, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "ID_KhachHang", referencedColumnName: "id" }])
  idKhachHang2: Khachhang;

  @ManyToOne(() => Suatchieu, (suatchieu) => suatchieu.vedats, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "ID_Suat", referencedColumnName: "id" }])
  idSuat2: Suatchieu;

  @ManyToOne(() => Phim, (phim) => phim.vedats, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "ID_Phim", referencedColumnName: "id" }])
  idPhim2: Phim;

  @ManyToOne(() => Ghe, (ghe) => ghe.vedats, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "ID_Ghe", referencedColumnName: "id" }])
  idGhe2: Ghe;
}
