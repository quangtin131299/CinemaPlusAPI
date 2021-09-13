import { Column, Entity, OneToMany } from "typeorm";
import { Phim } from "./Phim";

@Entity("quocgia", { schema: "cinemaplus" })
export class Quocgia {
  @Column("int", { primary: true, name: "ID" })
  id: number;

  @Column("varchar", { name: "Iso", nullable: true, length: 50 })
  iso: string | null;

  @Column("varchar", { name: "TenQuocGia", nullable: true, length: 50 })
  tenQuocGia: string | null;

  @Column("varchar", { name: "Iso3", nullable: true, length: 50 })
  iso3: string | null;

  @Column("varchar", { name: "MaSo", nullable: true, length: 50 })
  maSo: string | null;

  @Column("varchar", { name: "MaVung", nullable: true, length: 10 })
  maVung: string | null;

  @OneToMany(() => Phim, (phim) => phim.idQuocGia2)
  phims: Phim[];
}
