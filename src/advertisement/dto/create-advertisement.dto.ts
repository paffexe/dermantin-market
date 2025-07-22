import { Field, InputType } from "@nestjs/graphql";
import {
  AdvertisementStatus,
  AdvertisementType,
} from "../entities/advertisement.entity";

@InputType()
export class CreateAdvertisementDto {
  @Field()
  discount_percent: number;

  @Field(() => AdvertisementType)
  type: AdvertisementType;

  @Field(() => AdvertisementStatus)
  status: AdvertisementStatus;

  @Field()
  start_date: string;

  @Field()
  end_date: string;
}
