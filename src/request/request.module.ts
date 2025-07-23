import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RequestService } from "./request.service";
import { RequestController } from "./request.controller";
import { Request } from "./entities/request.entity";
import { User } from "../user/entities/user.entity";
import { RequestResolver } from "./request.resolver";
import { UserService } from "../user/user.service";
import { UserResolver } from "../user/user.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([Request, User])],
  controllers: [RequestController],
  providers: [RequestService, RequestResolver, UserService, UserResolver],
})
export class RequestModule {}
