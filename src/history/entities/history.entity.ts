import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Dermantin } from "../../dermantin/entities/dermantin.entity";

@ObjectType()
@Entity()
export class History {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.histories)
  @Field(() => User)
  user: User;

  @ManyToOne(() => Dermantin, (dermantin) => dermantin.histories)
  @Field(() => Dermantin)
  dermantin: Dermantin;
}
