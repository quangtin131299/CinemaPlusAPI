import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { HoadonBapnuoc } from "./HoadonBapnuoc";

@Index("fulltext_bapnuoc", ["tenCombo"], { fulltext: true })
@Entity("bapnuoc", { schema: "datvephim" })
export class Bapnuoc {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("varchar", { name: "TenCombo", nullable: true, length: 70 })
  tenCombo: string | null;

  @Column("int", { name: "DonGia", nullable: true })
  donGia: number | null;

  @Column("text", { name: "MoTa", nullable: true })
  moTa: string | null;

  @Column("text", { name: "Hinh", nullable: true })
  hinh: string | null;

  @Column("tinyint", { name: "isDelete", nullable: true, default: () => "'0'" })
  isDelete: number | null;

  @OneToMany(() => HoadonBapnuoc, (hoadonBapnuoc) => hoadonBapnuoc.idBapNuoc2)
  hoadonBapnuocs: HoadonBapnuoc[];
}
