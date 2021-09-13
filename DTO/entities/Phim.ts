import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PhimPhongXuat } from "./PhimPhongXuat";
import { Binhluan } from "./Binhluan";
import { Quocgia } from "./Quocgia";
import { Nhacungcap } from "./Nhacungcap";
import { Vedat } from "./Vedat";
import { Rapphim } from "./Rapphim";
import { Loaiphim } from "./Loaiphim";
import { PhimLichchieu } from "./PhimLichchieu";

@Index("fk_phim_nhacungcap_idx", ["idNhaCungCap"], {})
@Index("fk_phim_quocgia_idx", ["idQuocGia"], {})
@Index("fulltext_tenphim", ["tenPhim"], { fulltext: true })
@Entity("phim", { schema: "cinemaplus" })
export class Phim {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("varchar", { name: "TenPhim", length: 200 })
  tenPhim: string;

  @Column("text", { name: "Hinh", nullable: true })
  hinh: string | null;

  @Column("text", { name: "AnhBia", nullable: true })
  anhBia: string | null;

  @Column("varchar", { name: "TrangThai", length: 200 })
  trangThai: string;

  @Column("int", { name: "ThoiGian" })
  thoiGian: number;

  @Column("varchar", { name: "Trailer", length: 50 })
  trailer: string;

  @Column("text", { name: "MoTa", nullable: true })
  moTa: string | null;

  @Column("date", { name: "NgayKhoiChieu" })
  ngayKhoiChieu: string;

  @Column("int", { name: "LuocThich", nullable: true, default: () => "'0'" })
  luocThich: number | null;

  @Column("int", { name: "ID_NhaCungCap", nullable: true })
  idNhaCungCap: number | null;

  @Column("date", { name: "NgayKetThuc", nullable: true })
  ngayKetThuc: string | null;

  @Column("int", { name: "ID_QuocGia", nullable: true })
  idQuocGia: number | null;

  @Column("tinyint", { name: "isDelete", nullable: true, default: () => "'0'" })
  isDelete: number | null;

  @OneToMany(() => PhimPhongXuat, (phimPhongXuat) => phimPhongXuat.idPhim2)
  phimPhongXuats: PhimPhongXuat[];

  @OneToMany(() => Binhluan, (binhluan) => binhluan.idPhim2)
  binhluans: Binhluan[];

  @ManyToOne(() => Quocgia, (quocgia) => quocgia.phims, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "ID_QuocGia", referencedColumnName: "id" }])
  idQuocGia2: Quocgia;

  @ManyToOne(() => Nhacungcap, (nhacungcap) => nhacungcap.phims, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "ID_NhaCungCap", referencedColumnName: "id" }])
  idNhaCungCap2: Nhacungcap;

  @OneToMany(() => Vedat, (vedat) => vedat.idPhim2)
  vedats: Vedat[];

  @ManyToMany(() => Rapphim, (rapphim) => rapphim.phims)
  @JoinTable({
    name: "phim_rapphim",
    joinColumns: [{ name: "ID_Phim", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "ID_Rap", referencedColumnName: "id" }],
    schema: "cinemaplus",
  })
  rapphims: Rapphim[];

  @ManyToMany(() => Loaiphim, (loaiphim) => loaiphim.phims)
  loaiphims: Loaiphim[];

  @OneToMany(() => PhimLichchieu, (phimLichchieu) => phimLichchieu.idPhim2)
  phimLichchieus: PhimLichchieu[];
}
