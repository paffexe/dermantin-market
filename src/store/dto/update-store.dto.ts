import { Field, InputType, Int } from "@nestjs/graphql";
import { StoreRegion, StoreStatus } from "../entities/store.entity";

@InputType()
export class UpdateStoreDto {
  @Field()
  name?: string;

  @Field()
  logo_url?: string;

  @Field(() => StoreRegion)
  region?: StoreRegion;

  @Field()
  description?: string;

  @Field(() => StoreStatus)
  status?: StoreStatus;

  @Field(() => Int)
  managerId?: number;
}
