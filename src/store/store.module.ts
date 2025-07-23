import { Module } from "@nestjs/common";
import { StoreService } from "./store.service";
import { StoreController } from "./store.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Store } from "./entities/store.entity";
import { User } from "../user/entities/user.entity";
import { StoreResolver } from "./store.resolver";
import { UserService } from "../user/user.service";
import { UserResolver } from "../user/user.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([Store, User])],
  controllers: [StoreController],
  providers: [StoreService, StoreResolver, UserService, UserResolver],
})
export class StoreModule {}
