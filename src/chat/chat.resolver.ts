import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";
import { Chat } from "./entities/chat.entity";
import { CreateChatDto } from "./dto/create-chat.dto";
import { UpdateChatDto } from "./dto/update-chat.dto";
import { ChatService } from "./chat.service";

@Resolver(() => Chat)
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Query(() => [Chat])
  findAllChats() {
    return this.chatService.findAll();
  }

  @Query(() => Chat)
  findOneChat(@Args("id", { type: () => ID }) id: number) {
    return this.chatService.findOne(id);
  }

  @Mutation(() => Chat)
  createChat(@Args("createChat") createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  @Mutation(() => Chat)
  updateChat(
    @Args("id", { type: () => ID }) id: number,
    @Args("updateChat") updateChatDto: UpdateChatDto
  ) {
    return this.chatService.update(id, updateChatDto);
  }

  @Mutation(() => String)
  removeChat(@Args("id", { type: () => ID }) id: number) {
    return this.chatService.remove(id);
  }
}
