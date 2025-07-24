import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ObjectType, Field, registerEnumType, ID } from "@nestjs/graphql";
import { Request } from "../../request/entities/request.entity";
import { Chat } from "../../chat/entities/chat.entity";
import { Store } from "../../store/entities/store.entity";
import { History } from "../../history/entities/history.entity";
import { v4 as uuidv4 } from "uuid";
import { Order } from "../../order/entities/order.entity";
import { Review } from "../../review/entities/review.entity";

export enum UserRole {
  MANAGER = "manager",
  USER = "user",
}

export enum Region {
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
  KARAKALPAKSTAN = "Karakalpakstan",
}

export enum Language {
  UZBEK = "uzbek",
  RUSSIAN = "russian",
}

registerEnumType(UserRole, { name: "UserRole" });
registerEnumType(Region, { name: "Region" });
registerEnumType(Language, { name: "Language" });

@ObjectType()
@Entity("users")
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  full_name: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field({ nullable: true })
  phone: string;

  @Field({ nullable: false })
  password: string;

  @Field(() => UserRole)
  @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Field()
  @Column({ default: false })
  is_verified: boolean;

  @Field(() => Region)
  @Column({ type: "enum", enum: Region })
  region: Region;

  @Field(() => Language)
  @Column({ type: "enum", enum: Language })
  lang: Language;

  @Field()
  @Column()
  refresh_token: string;

  @Field()
  @Column({ default: () => `'${uuidv4()}'` })
  activation_link: string;

  @OneToMany(() => Request, (request) => request.user)
  @Field(() => [Request])
  requests: Request[];

  @OneToMany(() => Chat, (chat) => chat.user)
  chats: Chat[];

  @Field((type) => [Store])
  @OneToMany((type) => Store, (store) => store.manager)
  stores: Store[];

  @Field((type) => [History])
  @OneToMany((type) => History, (history) => history.user)
  histories: History[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
