import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Phong } from "./Phong";
import { Lichchieu } from "./Lichchieu";
import { Vedat } from "./Vedat";
import { Phim } from "./Phim";

@Entity("rapphim", { schema: "cinemaplus" })
export class Rapphim {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("varchar", { name: "TenRap", length: 200 })
  tenRap: string;

  @Column("varchar", { name: "Hinh", length: 200 })
  hinh: string;

  @Column("varchar", { name: "DiaChi", length: 200 })
  diaChi: string;

  @Column("varchar", { name: "ViDo", length: 100 })
  viDo: string;

  @Column("varchar", { name: "KinhDo", length: 100 })
  kinhDo: string;

  @OneToMany(() => Phong, (phong) => phong.idRap2)
  phongs: Phong[];

  @OneToMany(() => Lichchieu, (lichchieu) => lichchieu.idRap2)
  lichchieus: Lichchieu[];

  @OneToMany(() => Vedat, (vedat) => vedat.idRap2)
  vedats: Vedat[];

  @ManyToMany(() => Phim, (phim) => phim.rapphims)
  phims: Phim[];
}
