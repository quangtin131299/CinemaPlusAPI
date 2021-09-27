import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Phong } from "./Phong";
import { Vedat } from "./Vedat";

@Index("fk_ghe_phong_idx", ["idPhong"], {})
@Entity("ghe", { schema: "datvephim" })
export class Ghe {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("varchar", { name: "TenGhe", length: 200 })
  tenGhe: string;

  @Column("int", { name: "ID_Phong" })
  idPhong: number;

  @Column("varchar", {
    name: "TrangThai",
    length: 50,
    default: () => "'Trống'",
  })
  trangThai: string;

  @ManyToOne(() => Phong, (phong) => phong.ghes, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "ID_Phong", referencedColumnName: "id" }])
  idPhong2: Phong;

  @OneToMany(() => Vedat, (vedat) => vedat.idGhe2)
  vedats: Vedat[];
}
