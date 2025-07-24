// order.entity.ts
import { ObjectType, Field, Float, ID } from "@nestjs/graphql";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Store } from "../../store/entities/store.entity";
import { Dermantin } from "../../dermantin/entities/dermantin.entity";

@ObjectType()
@Entity()
export class Order {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Float)
  @Column("decimal", { precision: 10, scale: 2 })
  total_price: number;

  @Field(() => Float)
  @Column("decimal", { precision: 10, scale: 2 })
  remaining_price: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Field(() => Store)
  @ManyToOne(() => Store, (store) => store.orders)
  @JoinColumn({ name: "store_id" })
  store: Store;

  @Field(() => Dermantin)
  @ManyToOne(() => Dermantin, (dermantin) => dermantin.orders)
  @JoinColumn({ name: "dermantin_id" })
  dermantin: Dermantin;
}
