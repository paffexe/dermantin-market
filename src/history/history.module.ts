import { Module } from "@nestjs/common";
import { HistoryService } from "./history.service";
import { HistoryController } from "./history.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Dermantin } from "../dermantin/entities/dermantin.entity";
import { User } from "../user/entities/user.entity";
import { HistoryResolver } from "./history.resolver";
import { DermantinService } from "../dermantin/dermantin.service";
import { DermantinResolver } from "../dermantin/dermantin.resolver";
import { UserService } from "../user/user.service";
import { UserResolver } from "../user/user.resolver";
import { History } from "./entities/history.entity";

@Module({
  imports: [TypeOrmModule.forFeature([History, Dermantin, User])],
  controllers: [HistoryController],
  providers: [
    HistoryService,
    HistoryResolver,
    DermantinService,
    DermantinResolver,
    UserService,
    UserResolver,
  ],
})
export class HistoryModule {}
