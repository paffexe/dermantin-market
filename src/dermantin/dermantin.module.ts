import { Module } from "@nestjs/common";
import { DermantinService } from "./dermantin.service";
import { DermantinController } from "./dermantin.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Dermantin } from "./entities/dermantin.entity";
import { Advertisement } from "../advertisement/entities/advertisement.entity";
import { DermantinResolver } from "./dermantin.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([Dermantin, Advertisement])],
  controllers: [DermantinController],
  providers: [DermantinService, DermantinResolver],
})
export class DermantinModule {}
