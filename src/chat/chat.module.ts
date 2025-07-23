import { Module } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ChatController } from "./chat.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Chat } from "./entities/chat.entity";
import { ChatResolver } from "./chat.resolver";
import { UserService } from "../user/user.service";
import { UserResolver } from "../user/user.resolver";
import { User } from "../user/entities/user.entity";
import { Store } from "../store/entities/store.entity";
import { StoreService } from "../store/store.service";
import { StoreResolver } from "../store/store.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([Chat, User, Store])],
  controllers: [ChatController],
  providers: [
    ChatService,
    ChatResolver,
    UserService,
    UserResolver,
    StoreService,
    StoreResolver,
  ],
  exports: [ChatService],
})
export class ChatModule {}
