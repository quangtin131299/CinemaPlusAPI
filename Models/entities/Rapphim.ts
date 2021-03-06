import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Lichchieu } from "./Lichchieu";
import { Phim } from "./Phim";
import { Phong } from "./Phong";
import { Vedat } from "./Vedat";

@Entity("rapphim", { schema: "datvephim" })
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

  @OneToMany(() => Lichchieu, (lichchieu) => lichchieu.idRap2)
  lichchieus: Lichchieu[];

  @ManyToMany(() => Phim, (phim) => phim.rapphims)
  @JoinTable({
    name: "phim_rapphim",
    joinColumns: [{ name: "ID_Rap", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "ID_Phim", referencedColumnName: "id" }],
    schema: "datvephim",
  })
  phims: Phim[];

  @OneToMany(() => Phong, (phong) => phong.idRap2)
  phongs: Phong[];

  @OneToMany(() => Vedat, (vedat) => vedat.idRap2)
  vedats: Vedat[];
}
