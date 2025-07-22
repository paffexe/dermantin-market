import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AdvertisementService } from "./advertisement.service";
import { CreateAdvertisementDto } from "./dto/create-advertisement.dto";
import { UpdateAdvertisementDto } from "./dto/update-advertisement.dto";
import { Advertisement } from "./entities/advertisement.entity";

@Resolver(() => Advertisement)
export class AdvertisementResolver {
  constructor(private readonly advertisementService: AdvertisementService) {}

  @Mutation(() => Advertisement)
  createAdvertisement(
    @Args("createAdvertisement") createAdvertisementDto: CreateAdvertisementDto
  ) {
    return this.advertisementService.create(createAdvertisementDto);
  }

  @Query(() => [Advertisement])
  findAllAdvertisement() {
    return this.advertisementService.findAll();
  }

  @Query(() => Advertisement)
  findOneAdvertisement(@Args("id", { type: () => ID }) id: number) {
    return this.advertisementService.findOne(id);
  }

  @Mutation(() => Advertisement)
  updateAdvertisement(
    @Args("id", { type: () => ID }) id: number,
    @Args("updateAdvertisement") updateAdvertisementDto: UpdateAdvertisementDto
  ) {
    return this.advertisementService.update(id, updateAdvertisementDto);
  }

  @Mutation(() => Boolean)
  async removeAdvertisement(@Args("id", { type: () => ID }) id: number) {
    await this.advertisementService.remove(id);
    return true;
  }
}
