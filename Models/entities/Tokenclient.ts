import { Column, Entity } from "typeorm";

@Entity("tokenclient", { schema: "datvephim" })
export class Tokenclient {
  @Column("varchar", { primary: true, name: "Token", length: 200 })
  token: string;
}
