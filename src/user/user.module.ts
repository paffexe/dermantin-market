import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UserResolver } from "./user.resolver";
import { Request } from "../request/entities/request.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Request])],
  controllers: [UserController],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
