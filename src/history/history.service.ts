import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { History } from "./entities/history.entity";
import { CreateHistoryDto } from "./dto/create-history.dto";
import { UpdateHistoryDto } from "./dto/update-history.dto";
import { User } from "../user/entities/user.entity";
import { Dermantin } from "../dermantin/entities/dermantin.entity";

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private readonly historyRepo: Repository<History>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Dermantin)
    private readonly dermantinRepo: Repository<Dermantin>
  ) {}

  async create(createHistoryDto: CreateHistoryDto) {
    const user = await this.userRepo.findOneBy({ id: createHistoryDto.userId });
    if (!user) {
      throw new BadRequestException("Bunday user topilmadi");
    }

    const dermantin = await this.dermantinRepo.findOneBy({
      id: createHistoryDto.dermantinId,
    });
    if (!dermantin) {
      throw new BadRequestException("Bunday dermantin topilmadi");
    }

    const history = this.historyRepo.create({ user, dermantin });
    return this.historyRepo.save(history);
  }

  findAll() {
    return this.historyRepo.find({
      relations: ["user", "dermantin"],
    });
  }

  async findOne(id: number) {
    const history = await this.historyRepo.findOne({
      where: { id },
      relations: ["user", "dermantin"],
    });

    if (!history) {
      throw new NotFoundException("Bunday history topilmadi");
    }

    return history;
  }

  async update(id: number, updateHistoryDto: UpdateHistoryDto) {
    const history = await this.historyRepo.preload({
      id,
      ...updateHistoryDto,
    });

    if (!history) {
      throw new NotFoundException("Bunday history yo‘q");
    }

    return this.historyRepo.save(history);
  }

  async remove(id: number) {
    const history = await this.historyRepo.findOneBy({ id });

    if (!history) {
      throw new NotFoundException("Bunday history mavjud emas");
    }

    await this.historyRepo.delete(id);
    return { message: "Muvaffaqiyatli o‘chirildi" };
  }
}
