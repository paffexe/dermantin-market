import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { Review } from "./entities/review.entity";
import { User } from "../user/entities/user.entity";
import { Dermantin } from "../dermantin/entities/dermantin.entity";

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Dermantin)
    private readonly dermantinRepo: Repository<Dermantin>
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    const user = await this.userRepo.findOneBy({ id: createReviewDto.userId });

    if (!user) {
      throw new BadRequestException("Bunday user yo'q");
    }

    const dermantin = await this.dermantinRepo.findOneBy({
      id: createReviewDto.dermantinId,
    });

    if (!dermantin) {
      throw new BadRequestException("Bunday dermantin yo'q");
    }

    const review = this.reviewRepository.create({ user, dermantin });
    return this.reviewRepository.save(review);
  }

  async findAll(): Promise<Review[]> {
    return this.reviewRepository.find({
      relations: ["user"]["dermantin"],
    });
  }

  async findOne(id: number) {
    return this.reviewRepository.find({
      relations: ["user"]["dermantin"],
    });
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    const chat = await this.reviewRepository.preload({
      id,
      ...updateReviewDto,
    });

    if (!chat) {
      throw new NotFoundException("Bunday review yo'q");
    }

    return this.reviewRepository.save(chat);
  }

  async remove(id: number) {
    const chat = await this.reviewRepository.findOneBy({ id });

    if (!chat) {
      throw new NotFoundException("data doesn't exsist");
    }

    await this.reviewRepository.delete(id);
    return { message: "Deleted succesfully" };
  }
}
