import { Module } from "@nestjs/common";
import { ReviewService } from "./review.service";
import { ReviewController } from "./review.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Review } from "./entities/review.entity";
import { User } from "../user/entities/user.entity";
import { Dermantin } from "../dermantin/entities/dermantin.entity";
import { ReviewResolver } from "./review.resolver";
import { UserService } from "../user/user.service";
import { UserResolver } from "../user/user.resolver";
import { DermantinResolver } from "../dermantin/dermantin.resolver";
import { DermantinService } from "../dermantin/dermantin.service";

@Module({
  imports: [TypeOrmModule.forFeature([Review, User, Dermantin])],
  controllers: [ReviewController],
  providers: [
    ReviewService,
    ReviewResolver,
    UserService,
    UserResolver,
    DermantinResolver,
    DermantinService,
  ],
})
export class ReviewModule {}
