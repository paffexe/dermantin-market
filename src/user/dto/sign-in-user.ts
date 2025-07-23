import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SigninUserDto {
  @Field()
  email: string;

  @Field()
  password: string;
}
