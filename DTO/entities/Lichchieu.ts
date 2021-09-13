import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Rapphim } from "./Rapphim";
import { PhimLichchieu } from "./PhimLichchieu";

@Index("ID_Rap", ["idRap"], {})
@Entity("lichchieu", { schema: "cinemaplus" })
export class Lichchieu {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("date", { name: "Ngay" })
  ngay: string;

  @Column("int", { name: "ID_Rap" })
  idRap: number;

  @ManyToOne(() => Rapphim, (rapphim) => rapphim.lichchieus, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "ID_Rap", referencedColumnName: "id" }])
  idRap2: Rapphim;

  @OneToMany(() => PhimLichchieu, (phimLichchieu) => phimLichchieu.idLichchieu2)
  phimLichchieus: PhimLichchieu[];
}
