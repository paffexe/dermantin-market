import { Field, Float, InputType } from "@nestjs/graphql";
import { IsNumber, Min, Max } from "class-validator";

@InputType()
export class CreateReviewDto {
  @Field(() => Float)
  @IsNumber()
  @Min(1)
  @Max(5)
  ranking: number;
}
