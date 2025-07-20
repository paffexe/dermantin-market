import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";
import { ImagesService } from "./images.service";
import { CreateImageDto } from "./dto/create-image.dto";
import { UpdateImageDto } from "./dto/update-image.dto";
import { Image } from "./entities/image.entity";

@Resolver(() => Image)
export class ImageResolver {
  constructor(private readonly imagesService: ImagesService) {}

  @Query(() => [Image])
  findAllImages() {
    return this.imagesService.findAll();
  }

  @Query(() => Image)
  findOneImage(@Args("id", { type: () => ID }) id: number) {
    return this.imagesService.findOne(id);
  }

  @Mutation(() => Image)
  createImage(@Args("createImage") createImageDto: CreateImageDto) {
    return this.imagesService.create(createImageDto);
  }

  @Mutation(() => Image)
  updateImage(
    @Args("id", { type: () => ID }) id: number,
    @Args("updateImage") updateImageDto: UpdateImageDto
  ) {
    return this.imagesService.update(id, updateImageDto);
  }

  @Mutation(() => String)
  removeImage(@Args("id", { type: () => ID }) id: number) {
    return this.imagesService.remove(id);
  }
}
