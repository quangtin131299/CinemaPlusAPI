import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Khachhang } from "./Khachhang";
import { Phim } from "./Phim";

@Index("_idx", ["idKhachHang"], {})
@Index("fk_binhluan_phim_idx", ["idPhim"], {})
@Entity("binhluan", { schema: "datvephim" })
export class Binhluan {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("text", { name: "NoiDung", nullable: true })
  noiDung: string | null;

  @Column("int", { name: "Id_KhachHang", nullable: true })
  idKhachHang: number | null;

  @Column("date", { name: "NgayDang", nullable: true })
  ngayDang: string | null;

  @Column("int", { name: "ID_Phim", nullable: true })
  idPhim: number | null;

  @ManyToOne(() => Khachhang, (khachhang) => khachhang.binhluans, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "Id_KhachHang", referencedColumnName: "id" }])
  idKhachHang2: Khachhang;

  @ManyToOne(() => Phim, (phim) => phim.binhluans, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "ID_Phim", referencedColumnName: "id" }])
  idPhim2: Phim;
}
