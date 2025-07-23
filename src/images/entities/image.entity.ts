import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Dermantin } from "../../dermantin/entities/dermantin.entity";

@ObjectType()
@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image_url: string;

  @Column({ default: false })
  is_main: boolean;

  @Field(() => Dermantin)
  @ManyToOne(() => Dermantin, (dermantin) => dermantin.images)
  dermantin: Dermantin;
}
