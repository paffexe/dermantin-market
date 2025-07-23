import { Module } from "@nestjs/common";
import { MessageService } from "./message.service";
import { MessageController } from "./message.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Message } from "./entities/message.entity";
import { MessageResolver } from "./message.resolver";
import { ChatResolver } from "../chat/chat.resolver";
import { ChatService } from "../chat/chat.service";
import { Chat } from "../chat/entities/chat.entity";
import { Store } from "../store/entities/store.entity";
import { User } from "../user/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Message, Chat, Store, User])],
  controllers: [MessageController],
  providers: [MessageService, MessageResolver, ChatResolver, ChatService],
})
export class MessageModule {}
