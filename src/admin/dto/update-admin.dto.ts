import { PartialType } from "@nestjs/mapped-types";
import { CreateAdminDto } from "./create-admin.dto";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateAdminDto {
  @Field()
  fullname?: string;

  @Field()
  email?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field()
  password?: string;
}
