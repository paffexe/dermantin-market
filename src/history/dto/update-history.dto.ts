import { PartialType } from "@nestjs/mapped-types";
import { CreateHistoryDto } from "./create-history.dto";
import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpdateHistoryDto {
  @Field(() => Int)
  userId?: number;

  @Field(() => Int)
  dermantinId?: number;
}
