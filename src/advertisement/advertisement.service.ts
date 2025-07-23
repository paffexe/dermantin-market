import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Advertisement } from "./entities/advertisement.entity";
import { CreateAdvertisementDto } from "./dto/create-advertisement.dto";
import { UpdateAdvertisementDto } from "./dto/update-advertisement.dto";

@Injectable()
export class AdvertisementService {
  constructor(
    @InjectRepository(Advertisement)
    private readonly advertisementRepo: Repository<Advertisement>
  ) {}

  create(createAdvertisementDto: CreateAdvertisementDto) {
    return this.advertisementRepo.save(createAdvertisementDto);
  }

  findAll() {
    return this.advertisementRepo.find({ relations: ["dermantin"] });
  }

  findOne(id: number) {
    return this.advertisementRepo.findOne({
      where: { id },
      relations: ["dermantin"],
    });
  }

  async update(id: number, updateAdvertisementDto: UpdateAdvertisementDto) {
    const ad = await this.advertisementRepo.preload({
      id,
      ...updateAdvertisementDto,
    });
    if (!ad)
      throw new NotFoundException(`Advertisement with id ${id} not found`);
    return this.advertisementRepo.save(ad);
  }

  async remove(id: number) {
    const ad = await this.advertisementRepo.findOneBy({ id });
    if (!ad)
      throw new NotFoundException(`Advertisement with id ${id} not found`);
    await this.advertisementRepo.delete(id);
    return { message: `Advertisement with id ${id} has been removed` };
  }
}
