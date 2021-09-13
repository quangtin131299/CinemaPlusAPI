import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Vedat } from "./Vedat";
import { Phong } from "./Phong";

@Index("fk_ghe_phong_idx", ["idPhong"], {})
@Entity("ghe", { schema: "cinemaplus" })
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

  @OneToMany(() => Vedat, (vedat) => vedat.idGhe2)
  vedats: Vedat[];

  @ManyToOne(() => Phong, (phong) => phong.ghes, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "ID_Phong", referencedColumnName: "id" }])
  idPhong2: Phong;
}
