import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ghe } from "./Ghe";
import { PhimPhongXuat } from "./PhimPhongXuat";
import { Rapphim } from "./Rapphim";
import { Vedat } from "./Vedat";

@Index("ID_Rap", ["idRap"], {})
@Entity("phong", { schema: "cinemaplus" })
export class Phong {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("varchar", { name: "TenPhong", length: 200 })
  tenPhong: string;

  @Column("int", { name: "ID_Rap", default: () => "'1'" })
  idRap: number;

  @OneToMany(() => Ghe, (ghe) => ghe.idPhong2)
  ghes: Ghe[];

  @OneToMany(() => PhimPhongXuat, (phimPhongXuat) => phimPhongXuat.idPhong2)
  phimPhongXuats: PhimPhongXuat[];

  @ManyToOne(() => Rapphim, (rapphim) => rapphim.phongs, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "ID_Rap", referencedColumnName: "id" }])
  idRap2: Rapphim;

  @OneToMany(() => Vedat, (vedat) => vedat.idPhong2)
  vedats: Vedat[];
}
