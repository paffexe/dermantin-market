import {
  Field,
  Float,
  ID,
  ObjectType,
  registerEnumType,
} from "@nestjs/graphql";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Advertisement } from "../../advertisement/entities/advertisement.entity";
import { Image } from "../../images/entities/image.entity";
import { Category } from "../../category/entities/category.entity";
import { History } from "../../history/entities/history.entity";

export enum DermantinClass {
  PREMIUM = "premium",
  BASIC = "basic",
}

registerEnumType(DermantinClass, {
  name: "DermantinClass",
});

@ObjectType()
@Entity()
export class Dermantin {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => Float)
  @Column("decimal", { precision: 10, scale: 2 })
  price: number;

  @Field(() => Float)
  @Column("float")
  rating: number;

  @Field(() => DermantinClass)
  @Column({ type: "enum", enum: DermantinClass })
  class: DermantinClass;

  @Field((type) => [Advertisement])
  @OneToMany((type) => Advertisement, (ad) => ad.dermantin)
  ad: Advertisement[];

  @Field((type) => [Image])
  @OneToMany((type) => Image, (img) => img.dermantin)
  images: Image[];

  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.dermantin)
  category: Category;

  @Field((type) => [History])
  @OneToMany((type) => History, (history) => history.dermantin)
  histories: History[];
}
