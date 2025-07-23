import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";
import { StoreService } from "./store.service";
import { Store } from "./entities/store.entity";
import { CreateStoreDto } from "./dto/create-store.dto";
import { UpdateStoreDto } from "./dto/update-store.dto";

@Resolver(() => Store)
export class StoreResolver {
  constructor(private readonly storeService: StoreService) {}

  @Query(() => [Store])
  findAllStores() {
    return this.storeService.findAll();
  }

  @Query(() => Store)
  findOneStore(@Args("id", { type: () => ID }) id: number) {
    return this.storeService.findOne(id);
  }

  @Mutation(() => Store)
  createStore(@Args("createStore") createStoreDto: CreateStoreDto) {
    return this.storeService.create(createStoreDto);
  }

  @Mutation(() => Store)
  updateStore(
    @Args("id", { type: () => ID }) id: number,
    @Args("updateStore") updateStoreDto: UpdateStoreDto
  ) {
    return this.storeService.update(id, updateStoreDto);
  }

  @Mutation(() => String)
  removeStore(@Args("id", { type: () => ID }) id: number) {
    return this.storeService.remove(id);
  }
}
