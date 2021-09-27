import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PhimLichchieu } from "./PhimLichchieu";
import { PhimPhongXuat } from "./PhimPhongXuat";
import { Vedat } from "./Vedat";

@Entity("suatchieu", { schema: "datvephim" })
export class Suatchieu {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("time", { name: "Gio" })
  gio: string;

  @OneToMany(() => PhimLichchieu, (phimLichchieu) => phimLichchieu.idSuatchieu2)
  phimLichchieus: PhimLichchieu[];

  @OneToMany(() => PhimPhongXuat, (phimPhongXuat) => phimPhongXuat.idXuatChieu2)
  phimPhongXuats: PhimPhongXuat[];

  @OneToMany(() => Vedat, (vedat) => vedat.idSuat2)
  vedats: Vedat[];
}
