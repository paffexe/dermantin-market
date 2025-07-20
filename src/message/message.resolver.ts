import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { MessageService } from "./message.service";
import { Message } from "./entities/message.entity";
import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";

@Resolver(() => Message)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Mutation(() => Message)
  createMessage(@Args("createMessageDto") createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @Query(() => [Message], { name: "getAllMessages" })
  findAll() {
    return this.messageService.findAll();
  }

  @Query(() => Message, { name: "getMessageById" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.messageService.findOne(id);
  }

  @Mutation(() => Message)
  updateMessage(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateMessageDto") updateMessageDto: UpdateMessageDto
  ) {
    return this.messageService.update(id, updateMessageDto);
  }

  @Mutation(() => Boolean)
  removeMessage(@Args("id", { type: () => Int }) id: number) {
    return this.messageService.remove(id);
  }
}
