import { InputType, Field, Float, Int } from "@nestjs/graphql";
import { IsNumber } from "class-validator";

@InputType()
export class CreateOrderDto {
  @Field(() => Float)
  @IsNumber()
  total_price: number;

  @Field(() => Float)
  @IsNumber()
  remaining_price: number;

  @Field(() => Int)
  @IsNumber()
  userId: number;

  @Field(() => Int)
  @IsNumber()
  storeId: number;

  @Field(() => Int)
  @IsNumber()
  dermantinId: number;
}
