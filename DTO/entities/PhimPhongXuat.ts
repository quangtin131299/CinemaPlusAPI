import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Phim } from "./Phim";
import { Suatchieu } from "./Suatchieu";
import { Phong } from "./Phong";

@Index("ID_Phong", ["idPhong"], {})
@Index("ID_XuatChieu", ["idXuatChieu"], {})
@Index("ID_Phim", ["idPhim"], {})
@Entity("phim_phong_xuat", { schema: "cinemaplus" })
export class PhimPhongXuat {
  @Column("int", { primary: true, name: "ID_Phim" })
  idPhim: number;

  @Column("int", { primary: true, name: "ID_Phong" })
  idPhong: number;

  @Column("int", { primary: true, name: "ID_XuatChieu" })
  idXuatChieu: number;

  @Column("date", { primary: true, name: "Ngay" })
  ngay: string;

  @ManyToOne(() => Phim, (phim) => phim.phimPhongXuats, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "ID_Phim", referencedColumnName: "id" }])
  idPhim2: Phim;

  @ManyToOne(() => Suatchieu, (suatchieu) => suatchieu.phimPhongXuats, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "ID_XuatChieu", referencedColumnName: "id" }])
  idXuatChieu2: Suatchieu;

  @ManyToOne(() => Phong, (phong) => phong.phimPhongXuats, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "ID_Phong", referencedColumnName: "id" }])
  idPhong2: Phong;
}
