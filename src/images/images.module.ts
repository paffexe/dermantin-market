import { Module } from "@nestjs/common";
import { ImagesService } from "./images.service";
import { ImagesController } from "./images.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Image } from "./entities/image.entity";
import { Dermantin } from "../dermantin/entities/dermantin.entity";
import { ImageResolver } from "./images.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([Image, Dermantin])],
  controllers: [ImagesController],
  providers: [ImagesService, ImageResolver],
})
export class ImagesModule {}
