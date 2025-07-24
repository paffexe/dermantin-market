import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { Store } from "../store/entities/store.entity";
import { User } from "../user/entities/user.entity";
import { Dermantin } from "../dermantin/entities/dermantin.entity";
import { OrderResolver } from "./order.resolver";
import { StoreService } from "../store/store.service";
import { StoreResolver } from "../store/store.resolver";
import { UserService } from "../user/user.service";
import { UserResolver } from "../user/user.resolver";
import { DermantinService } from "../dermantin/dermantin.service";
import { DermantinResolver } from "../dermantin/dermantin.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([Order, Store, User, Dermantin])],
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderResolver,
    StoreService,
    StoreResolver,
    UserService,
    UserResolver,
    DermantinService,
    DermantinResolver,
  ],
})
export class OrderModule {}
