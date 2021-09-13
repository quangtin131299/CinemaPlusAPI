import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("admin", { schema: "cinemaplus" })
export class Admin {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("varchar", { name: "HoTen", length: 100 })
  hoTen: string;

  @Column("varchar", { name: "TaiKhoan", length: 100 })
  taiKhoan: string;

  @Column("varchar", { name: "MatKhau", length: 100 })
  matKhau: string;

  @Column("int", { name: "VaiTro" })
  vaiTro: number;

  @Column("varchar", { name: "Email", nullable: true, length: 50 })
  email: string | null;

  @Column("varchar", { name: "Sdt", nullable: true, length: 15 })
  sdt: string | null;
}
