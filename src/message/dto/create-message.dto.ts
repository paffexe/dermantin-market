import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateMessageDto {
  @Field()
  text: string;

  @Field({ defaultValue: false })
  is_read: boolean;
}
