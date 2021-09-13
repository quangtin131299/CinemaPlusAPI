import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Phim } from "./Phim";

@Index("fulltext_tennhacungcap", ["tenNhaCungCap"], { fulltext: true })
@Entity("nhacungcap", { schema: "cinemaplus" })
export class Nhacungcap {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("varchar", { name: "TenNhaCungCap", nullable: true, length: 80 })
  tenNhaCungCap: string | null;

  @Column("varchar", { name: "DiaChi", nullable: true, length: 250 })
  diaChi: string | null;

  @Column("varchar", { name: "SĐT", nullable: true, length: 10 })
  sT: string | null;

  @Column("varchar", { name: "Email", nullable: true, length: 45 })
  email: string | null;

  @Column("tinyint", { name: "isDelete", nullable: true, default: () => "'0'" })
  isDelete: number | null;

  @OneToMany(() => Phim, (phim) => phim.idNhaCungCap2)
  phims: Phim[];
}
