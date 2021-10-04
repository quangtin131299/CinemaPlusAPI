import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Khachhang } from "./Khachhang";
import { Phim } from "./Phim";

@Index("fk_khachhang_phim_phim_idx", ["idPhim"], {})
@Index("fk_khachhang_phim_khachhang_idx", ["idKhachHang"], {})
@Entity("khachhang_phim", { schema: "datvephim" })
export class KhachhangPhim {
  @Column("int", { primary: true, name: "Id_KhachHang" })
  idKhachHang: number;

  @Column("int", { primary: true, name: "Id_Phim" })
  idPhim: number;

  @Column("date", { name: "ngayghi", nullable: true })
  ngayghi: string | null;

  @ManyToOne(() => Khachhang, (khachhang) => khachhang.khachhangPhims, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "Id_KhachHang", referencedColumnName: "id" }])
  idKhachHang2: Khachhang;

  @ManyToOne(() => Phim, (phim) => phim.khachhangPhims, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "Id_Phim", referencedColumnName: "id" }])
  idPhim2: Phim;
}
