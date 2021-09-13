import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PhimPhongXuat } from "./PhimPhongXuat";
import { Vedat } from "./Vedat";
import { PhimLichchieu } from "./PhimLichchieu";

@Entity("suatchieu", { schema: "cinemaplus" })
export class Suatchieu {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("time", { name: "Gio" })
  gio: string;

  @OneToMany(() => PhimPhongXuat, (phimPhongXuat) => phimPhongXuat.idXuatChieu2)
  phimPhongXuats: PhimPhongXuat[];

  @OneToMany(() => Vedat, (vedat) => vedat.idSuat2)
  vedats: Vedat[];

  @OneToMany(() => PhimLichchieu, (phimLichchieu) => phimLichchieu.idSuatchieu2)
  phimLichchieus: PhimLichchieu[];
}
