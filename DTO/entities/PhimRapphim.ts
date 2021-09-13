import { Column, Entity, Index } from "typeorm";

@Index("fk_phimrapphim_phim_idx", ["idPhim"], {})
@Entity("phim_rapphim", { schema: "cinemaplus" })
export class PhimRapphim {
  @Column("int", { primary: true, name: "ID_Rap" })
  idRap: number;

  @Column("int", { primary: true, name: "ID_Phim" })
  idPhim: number;
}
