import { IsBoolean, IsString } from "class-validator";

export class CreateImageDto {
  @IsString()
  image_url: string;

  @IsBoolean()
  is_main: boolean;
}
