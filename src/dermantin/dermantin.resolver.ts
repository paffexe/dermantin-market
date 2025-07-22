import { Get, Body, Patch, Param, Delete } from "@nestjs/common";
import { DermantinService } from "./dermantin.service";
import { CreateDermantinDto } from "./dto/create-dermantin.dto";
import { UpdateDermantinDto } from "./dto/update-dermantin.dto";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Dermantin } from "./entities/dermantin.entity";

@Resolver("dermantin")
export class DermantinResolver {
  constructor(private readonly dermantinService: DermantinService) {}

  @Mutation(() => Dermantin)
  createDermantin(
    @Args("createDermantin", { type: () => ID })
    createDermantinDto: CreateDermantinDto
  ) {
    return this.dermantinService.create(createDermantinDto);
  }

  @Query(() => [Dermantin])
  findAllDermantin() {
    return this.dermantinService.findAll();
  }

  @Query(() => Dermantin)
  findOne(@Args("id", { type: () => ID }) id: number) {
    return this.dermantinService.findOne(+id);
  }

  @Mutation(() => Dermantin)
  update(
    @Args("id", { type: () => ID }) id: number,
    @Args("updateDermantin") updateDermantinDto: UpdateDermantinDto
  ) {
    return this.dermantinService.update(+id, updateDermantinDto);
  }

  @Mutation(() => Number)
  remove(@Args("id", { type: () => ID }) id: number) {
    return this.dermantinService.remove(+id);
  }
}
