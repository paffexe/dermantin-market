// update-order.dto.ts
import { Field, Float, InputType, Int, PartialType } from "@nestjs/graphql";
import { CreateOrderDto } from "./create-order.dto";

@InputType()
export class UpdateOrderDto {
  @Field(() => Float)
  total_price?: number;

  @Field(() => Float)
  remaining_price?: number;

  @Field(() => Int)
  userId?: number;

  @Field(() => Int)
  storeId?: number;

  @Field(() => Int)
  dermantinId?: number;
}
