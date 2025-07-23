import { PartialType } from "@nestjs/mapped-types";
import { CreateMessageDto } from "./create-message.dto";
import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpdateMessageDto {
  @Field()
  text?: string;

  @Field({ defaultValue: false })
  is_read?: boolean;

  @Field(() => Int)
  chatId?: number;
}
