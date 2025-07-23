import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateHistoryDto {
  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  dermantinId: number;
}
