import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Phim } from "./Phim";
import { Suatchieu } from "./Suatchieu";
import { Lichchieu } from "./Lichchieu";

@Index("fk_phimlichchieu_lichchieu_idx", ["idLichchieu"], {})
@Index("fk_phimlichchieu_suat_idx", ["idSuatchieu"], {})
@Entity("phim_lichchieu", { schema: "datvephim" })
export class PhimLichchieu {
  @Column("int", { primary: true, name: "ID_Phim" })
  idPhim: number;

  @Column("int", { primary: true, name: "ID_Lichchieu" })
  idLichchieu: number;

  @Column("int", { primary: true, name: "ID_Suatchieu" })
  idSuatchieu: number;

  @ManyToOne(() => Phim, (phim) => phim.phimLichchieus, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "ID_Phim", referencedColumnName: "id" }])
  idPhim2: Phim;

  @ManyToOne(() => Suatchieu, (suatchieu) => suatchieu.phimLichchieus, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "ID_Suatchieu", referencedColumnName: "id" }])
  idSuatchieu2: Suatchieu;

  @ManyToOne(() => Lichchieu, (lichchieu) => lichchieu.phimLichchieus, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "ID_Lichchieu", referencedColumnName: "id" }])
  idLichchieu2: Lichchieu;
}
