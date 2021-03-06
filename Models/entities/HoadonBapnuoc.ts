import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Hoadon } from "./Hoadon";
import { Bapnuoc } from "./Bapnuoc";

@Index("fk_hoadon_bapnuoc_bapnuoc_idx", ["idBapNuoc"], {})
@Index("fk_hoadon_bapnuoc_hoadon", ["idHoaDon"], {})
@Entity("hoadon_bapnuoc", { schema: "datvephim" })
export class HoadonBapnuoc {
  @Column("int", { primary: true, name: "ID_HoaDon" })
  idHoaDon: number;

  @Column("int", { primary: true, name: "ID_BapNuoc" })
  idBapNuoc: number;

  @Column("int", { name: "SoLuong", nullable: true })
  soLuong: number | null;

  @Column("int", { name: "ThanhTien", nullable: true })
  thanhTien: number | null;

  @ManyToOne(() => Hoadon, (hoadon) => hoadon.hoadonBapnuocs, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "ID_HoaDon", referencedColumnName: "id" }])
  idHoaDon2: Hoadon;

  @ManyToOne(() => Bapnuoc, (bapnuoc) => bapnuoc.hoadonBapnuocs, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "ID_BapNuoc", referencedColumnName: "id" }])
  idBapNuoc2: Bapnuoc;
}
