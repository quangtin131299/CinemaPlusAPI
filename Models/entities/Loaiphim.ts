import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Phim } from "./Phim";

@Entity("loaiphim", { schema: "datvephim" })
export class Loaiphim {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("varchar", { name: "TenLoai", length: 200 })
  tenLoai: string;

  @ManyToMany(() => Phim, (phim) => phim.loaiphims)
  @JoinTable({
    name: "phim_loaiphim",
    joinColumns: [{ name: "ID_Loai", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "ID_Phim", referencedColumnName: "id" }],
    schema: "datvephim",
  })
  phims: Phim[];
}
