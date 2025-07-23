import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateStoreDto } from "./dto/create-store.dto";
import { UpdateStoreDto } from "./dto/update-store.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Store } from "./entities/store.entity";
import { Repository } from "typeorm";
import { User } from "../user/entities/user.entity";

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store) private readonly storeRepo: Repository<Store>,
    @InjectRepository(User) private readonly userRepo: Repository<User>
  ) {}
  async create(createStoreDto: CreateStoreDto) {
    const manager = await this.userRepo.findOneBy({
      id: createStoreDto.managerId,
    });

    if (!manager) {
      throw new BadRequestException("Bunday manager yo'q");
    }

    return this.storeRepo.save(createStoreDto);
  }

  findAll() {
    return this.storeRepo.find({ relations: ["manager"] });
  }

  findOne(id: number) {
    return this.storeRepo.find({ relations: ["manager"] });
  }

  async update(id: number, updateStoreDto: UpdateStoreDto) {
    const store = await this.storeRepo.preload({ id, ...updateStoreDto });

    if (!store) {
      throw new NotFoundException("Bunday store yo'q");
    }

    return this.storeRepo.save(store);
  }

  async remove(id: number) {
    const store = await this.storeRepo.findOneBy({ id });

    if (!store) {
      throw new NotFoundException("Store with this id doesn't exsist");
    }

    await this.storeRepo.delete(id);
    return { message: "Deleted succesfully" };
  }
}
