import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";
import { ReviewService } from "./review.service";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { Review } from "./entities/review.entity";

@Resolver(() => Review)
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}

  @Query(() => [Review])
  findAllReviews() {
    return this.reviewService.findAll();
  }

  @Query(() => Review)
  findOneReview(@Args("id", { type: () => ID }) id: number) {
    return this.reviewService.findOne(id);
  }

  @Mutation(() => Review)
  createReview(@Args("createReview") createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  @Mutation(() => Review)
  updateReview(
    @Args("id", { type: () => ID }) id: number,
    @Args("updateReview") updateReviewDto: UpdateReviewDto
  ) {
    return this.reviewService.update(id, updateReviewDto);
  }

  @Mutation(() => String)
  removeReview(@Args("id", { type: () => ID }) id: number) {
    return this.reviewService.remove(id);
  }
}
