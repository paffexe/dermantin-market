import { InputType, Field } from "@nestjs/graphql";
import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { UserRole, Region, Language } from "../entities/user.entity";

@InputType()
export class CreateUserDto {
  @Field()
  @IsString()
  full_name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @IsString()
  phone: string;

  @Field({ nullable: false })
  password: string;

  @Field({ nullable: false })
  confirm_password: string;

  @Field(() => UserRole, { defaultValue: UserRole.USER })
  @IsEnum(UserRole)
  role: UserRole;

  @Field(() => Region)
  @IsEnum(Region)
  region: Region;

  @Field(() => Language)
  @IsEnum(Language)
  lang: Language;
}
