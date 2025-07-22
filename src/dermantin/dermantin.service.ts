import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Dermantin } from "./entities/dermantin.entity";
import { CreateDermantinDto } from "./dto/create-dermantin.dto";
import { UpdateDermantinDto } from "./dto/update-dermantin.dto";

@Injectable()
export class DermantinService {
  constructor(
    @InjectRepository(Dermantin)
    private readonly dermantinRepo: Repository<Dermantin>
  ) {}

  create(createDermantinDto: CreateDermantinDto) {
    return this.dermantinRepo.save(createDermantinDto);
  }

  findAll() {
    return this.dermantinRepo.find({ relations: ["ad"] });
  }

  findOne(id: number) {
    return this.dermantinRepo.findOne({ where: { id }, relations: ["ad"] });
  }

  async update(id: number, updateDermantinDto: UpdateDermantinDto) {
    const dermantin = await this.dermantinRepo.preload({
      id,
      ...updateDermantinDto,
    });

    if (!dermantin) {
      throw new NotFoundException(`Dermantin with id ${id} not found`);
    }

    return this.dermantinRepo.save(dermantin);
  }

  async remove(id: number) {
    const dermantin = await this.dermantinRepo.findOneBy({ id });

    if (!dermantin) {
      throw new NotFoundException(`Dermantin with id ${id} not found`);
    }

    await this.dermantinRepo.delete(id);
    return { message: `Dermantin with id ${id} has been removed` };
  }
}
