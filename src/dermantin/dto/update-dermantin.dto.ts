import { Field, Float, InputType } from "@nestjs/graphql";
import { DermantinClass } from "../entities/dermantin.entity";

@InputType()
export class UpdateDermantinDto {
  @Field()
  name?: string;

  @Field(() => Float)
  price?: number;

  @Field(() => Float)
  rating?: number;

  @Field(() => DermantinClass)
  class?: DermantinClass;
}
