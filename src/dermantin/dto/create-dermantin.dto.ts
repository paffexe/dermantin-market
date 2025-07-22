import { InputType, Field, Float } from "@nestjs/graphql";
import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { DermantinClass } from "../entities/dermantin.entity";
import { Advertisement } from "../../advertisement/entities/advertisement.entity";
import { OneToMany } from "typeorm";

@InputType()
export class CreateDermantinDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  price: number;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  rating: number;

  @Field(() => DermantinClass)
  @IsEnum(DermantinClass)
  class: DermantinClass;

  
}
