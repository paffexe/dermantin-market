import { Module } from "@nestjs/common";
import { AdvertisementService } from "./advertisement.service";
import { AdvertisementController } from "./advertisement.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Advertisement } from "./entities/advertisement.entity";
import { Dermantin } from "../dermantin/entities/dermantin.entity";
import { AdvertisementResolver } from "./advertisement.resolver";
import { DermantinService } from "../dermantin/dermantin.service";
import { DermantinResolver } from "../dermantin/dermantin.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([Advertisement, Dermantin])],
  controllers: [AdvertisementController],
  providers: [
    AdvertisementService,
    AdvertisementResolver,
    DermantinService,
    DermantinResolver,
  ],
})
export class AdvertisementModule {}
