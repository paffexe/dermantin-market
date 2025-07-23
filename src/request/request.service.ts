import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Request } from "./entities/request.entity";
import { CreateRequestDto } from "./dto/create-request.dto";
import { UpdateRequestDto } from "./dto/update-request.dto";
import { User } from "../user/entities/user.entity";

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(Request)
    private readonly requestRepo: Repository<Request>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  async create(createRequestDto: CreateRequestDto) {
    const user = await this.userRepo.findOneBy({ id: createRequestDto.userId });
    if (!user)
      throw new NotFoundException(
        `User with id ${createRequestDto.userId} not found`
      );

    const request = this.requestRepo.create({
      ...createRequestDto,
      user,
    });

    return this.requestRepo.save(request);
  }

  findAll() {
    return this.requestRepo.find({ relations: ["user"] });
  }

  findOne(id: number) {
    return this.requestRepo.findOne({ where: { id }, relations: ["user"] });
  }

  async update(id: number, updateRequestDto: UpdateRequestDto) {
    const request = await this.requestRepo.preload({ id, ...updateRequestDto });
    if (!request)
      throw new NotFoundException(`Request with id ${id} not found`);
    return this.requestRepo.save(request);
  }

  async remove(id: number) {
    const request = await this.requestRepo.findOneBy({ id });
    if (!request)
      throw new NotFoundException(`Request with id ${id} not found`);
    await this.requestRepo.delete(id);
    return { message: `Request with id ${id} has been removed` };
  }
}
