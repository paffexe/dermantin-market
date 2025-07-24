import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Dermantin } from "../../dermantin/entities/dermantin.entity";

@ObjectType()
@Entity()
export class Review {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Float)
  @Column({ type: "float" })
  ranking: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Field(() => Dermantin)
  @ManyToOne(() => Dermantin, (dermantin) => dermantin.reviews)
  @JoinColumn({ name: "dermantin_id" })
  dermantin: Dermantin;
}
