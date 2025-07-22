import { IsBoolean, IsString } from "class-validator";
import { InputType } from "@nestjs/graphql";

@InputType()
export class UpdateImageDto {
  @IsString()
  image_url?: string;

  @IsBoolean()
  is_main?: boolean;
}
