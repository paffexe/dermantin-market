import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpdateChatDto {
  @Field(() => Int)
  userId?: number;

  @Field(() => Int)
  storeId?: number;
}
