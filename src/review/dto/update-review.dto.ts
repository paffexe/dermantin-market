import { PartialType } from "@nestjs/mapped-types";
import { CreateReviewDto } from "./create-review.dto";
import { Field, InputType, Int } from "@nestjs/graphql";
import { Max, Min } from "class-validator";

@InputType()
export class UpdateReviewDto {
  @Field()
  @Min(1)
  @Max(5)
  ranking?: number;

  @Field(() => Int)
  userId?: number;

  @Field(() => Int)
  dermantinId?: number;
}
