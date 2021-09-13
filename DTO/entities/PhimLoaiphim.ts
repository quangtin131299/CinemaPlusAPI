import { Column, Entity, Index } from "typeorm";

@Index("IDX_0b52e21e57f93c3aad5dd8c0de", ["idLoai"], {})
@Index("IDX_5a19547fb18a6532d145f84137", ["idPhim"], {})
@Entity("phim_loaiphim", { schema: "cinemaplus" })
export class PhimLoaiphim {
  @Column("int", { primary: true, name: "ID_Phim" })
  idPhim: number;

  @Column("int", { primary: true, name: "ID_Loai" })
  idLoai: number;
}
