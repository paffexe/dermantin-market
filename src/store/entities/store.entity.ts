import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, ID } from "@nestjs/graphql";
import { registerEnumType } from "@nestjs/graphql";
import { User } from "../../user/entities/user.entity";
import { Chat } from "../../chat/entities/chat.entity";

export enum StoreRegion {
  TASHKENT = "Tashkent",
  SAMARKAND = "Samarkand",
  ANDIJAN = "Andijan",
  FERGANA = "Fergana",
  BUKHARA = "Bukhara",
  NAMANGAN = "Namangan",
  KHOREZM = "Khorezm",
  NAVOI = "Navoi",
  KASHKADARYA = "Kashkadarya",
  SURKHANDARYA = "Surkhandarya",
  JIZZAKH = "Jizzakh",
  SYRDARYA = "Syrdarya",
}

export enum StoreStatus {
  CONFIRMED = "confirmed",
  REJECTED = "rejected",
  PENDING = "pending",
}

registerEnumType(StoreRegion, { name: "StoreRegion" });
registerEnumType(StoreStatus, { name: "StoreStatus" });

@ObjectType()
@Entity()
export class Store {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  logo_url: string;

  @Field(() => StoreRegion)
  @Column({ type: "enum", enum: StoreRegion })
  region: StoreRegion;

  @Field()
  @Column()
  description: string;

  @Field(() => StoreStatus)
  @Column({ type: "enum", enum: StoreStatus, default: StoreStatus.PENDING })
  status: StoreStatus;

  @Field(() => User)
  @ManyToOne(() => User, (manager) => manager.stores)
  manager: User;

  @OneToMany(() => Chat, (chat) => chat.store)
  @Field(() => [Chat])
  chats: Chat[];
}
