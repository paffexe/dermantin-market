import { InputType } from "@nestjs/graphql";
import { IsBoolean, IsString } from "class-validator";

@InputType()
export class CreateImageDto {
  @IsString()
  image_url: string;

  @IsBoolean()
  is_main: boolean;
}
