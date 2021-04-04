import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { Base } from "../../../framework/entities/base";
import { User } from "src/users/entities/user.entity";

@Entity()
export class Company extends Base {
  @Column()
  name: string;

  @Column()
  website: string;

  @Column()
  description: string;

  @OneToOne((type) => User)
  @JoinColumn()
  user: User;
}