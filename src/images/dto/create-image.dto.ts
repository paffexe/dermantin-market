import { InputType, Field } from "@nestjs/graphql";
import { IsBoolean, IsString } from "class-validator";

@InputType()
export class CreateImageDto {
  @Field()
  @IsString()
  image_url: string;

  @Field()
  @IsBoolean()
  is_main: boolean;
}
