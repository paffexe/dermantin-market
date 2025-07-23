import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";
import { RequestService } from "./request.service";
import { Request } from "./entities/request.entity";
import { CreateRequestDto } from "./dto/create-request.dto";
import { UpdateRequestDto } from "./dto/update-request.dto";

@Resolver(() => Request)
export class RequestResolver {
  constructor(private readonly requestService: RequestService) {}

  @Query(() => [Request])
  findAllRequests() {
    return this.requestService.findAll();
  }

  @Query(() => Request)
  findOneRequest(@Args("id", { type: () => ID }) id: number) {
    return this.requestService.findOne(id);
  }

  @Mutation(() => Request)
  createRequest(@Args("createRequest") createRequestDto: CreateRequestDto) {
    return this.requestService.create(createRequestDto);
  }

  @Mutation(() => Request)
  updateRequest(
    @Args("id", { type: () => ID }) id: number,
    @Args("updateRequest") updateRequestDto: UpdateRequestDto
  ) {
    return this.requestService.update(id, updateRequestDto);
  }

  @Mutation(() => String)
  removeRequest(@Args("id", { type: () => ID }) id: number) {
    return this.requestService.remove(id);
  }
}
