import { InputType, Field } from "@nestjs/graphql";
import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

@InputType()
export class CreateAdminDto {
  @Field()
  @IsString()
  fullname: string;

  @Field()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  phone?: string;

  @Field()
  @IsString()
  @MinLength(6)
  password: string;
}
