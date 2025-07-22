import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateCategoryDto {
  @Field()
  name?: string;

  @Field({ nullable: true })
  logo?: string;
}
