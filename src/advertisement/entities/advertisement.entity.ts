import { ObjectType, Field, ID, registerEnumType } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Dermantin } from "../../dermantin/entities/dermantin.entity";

export enum AdvertisementType {
  STANDART = "standart",
  DISCOUNTED = "discounted",
}

export enum AdvertisementStatus {
  ACCEPTED = "accepted",
  REJECTED = "rejected",
  PROCESSING = "processing",
}

registerEnumType(AdvertisementType, {
  name: "AdvertisementType",
});

registerEnumType(AdvertisementStatus, {
  name: "AdvertisementStatus",
});

@ObjectType()
@Entity()
export class Advertisement {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: "smallint" })
  discount_percent: number;

  @Field(() => AdvertisementType)
  @Column({ type: "enum", enum: AdvertisementType })
  type: AdvertisementType;

  @Field(() => AdvertisementStatus)
  @Column({ type: "enum", enum: AdvertisementStatus })
  status: AdvertisementStatus;

  @Field()
  @Column({ type: "date" })
  start_date: string;

  @Field()
  @Column({ type: "date" })
  end_date: string;

  @Field(() => Dermantin)
  @ManyToOne(() => Dermantin, (dermantin) => dermantin.ad)
  dermantin: Dermantin;
}
