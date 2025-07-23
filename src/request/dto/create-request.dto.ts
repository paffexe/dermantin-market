import { Field, InputType } from "@nestjs/graphql";
import { RequestStatus } from "../entities/request.entity";

@InputType()
export class CreateRequestDto {
  @Field()
  text: string;

  @Field(() => RequestStatus, { defaultValue: RequestStatus.PENDING })
  status: RequestStatus;

  @Field(() => Number)
  userId: number;
}
