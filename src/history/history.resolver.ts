import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";
import { HistoryService } from "./history.service";
import { History } from "./entities/history.entity";
import { CreateHistoryDto } from "./dto/create-history.dto";
import { UpdateHistoryDto } from "./dto/update-history.dto";

@Resolver(() => History)
export class HistoryResolver {
  constructor(private readonly historyService: HistoryService) {}

  @Query(() => [History])
  findAllHistories() {
    return this.historyService.findAll();
  }

  @Query(() => History)
  findOneHistory(@Args("id", { type: () => ID }) id: number) {
    return this.historyService.findOne(id);
  }

  @Mutation(() => History)
  createHistory(@Args("createHistory") createHistoryDto: CreateHistoryDto) {
    return this.historyService.create(createHistoryDto);
  }

  @Mutation(() => History)
  updateHistory(
    @Args("id", { type: () => ID }) id: number,
    @Args("updateHistory") updateHistoryDto: UpdateHistoryDto
  ) {
    return this.historyService.update(id, updateHistoryDto);
  }

  @Mutation(() => String)
  removeHistory(@Args("id", { type: () => ID }) id: number) {
    return this.historyService.remove(id);
  }
}
