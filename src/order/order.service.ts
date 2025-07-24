import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { Repository } from "typeorm";
import { User } from "../user/entities/user.entity";
import { Store } from "../store/entities/store.entity";
import { Dermantin } from "../dermantin/entities/dermantin.entity";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Store)
    private readonly storeRepo: Repository<Store>,
    @InjectRepository(Dermantin)
    private readonly dermRepo: Repository<Dermantin>
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const user = await this.userRepo.findOneBy({ id: createOrderDto.userId });

    if (!user) {
      throw new BadRequestException("Bunday user yo'q");
    }

    const store = await this.storeRepo.findOneBy({
      id: createOrderDto.storeId,
    });

    if (!store) {
      throw new BadRequestException("Bunday store yo'q");
    }

    const dermantin = await this.dermRepo.findOneBy({
      id: createOrderDto.dermantinId,
    });

    if (!dermantin) {
      throw new BadRequestException("Bunday dermantin yo'q");
    }

    const order = this.orderRepo.create({ user, store });
    return this.orderRepo.save(order);
  }

  findAll() {
    return this.orderRepo.find({ relations: ["user"]["store"]["dermantin"] });
  }

  findOne(id: number) {
    return this.orderRepo.find({
      relations: ["user"]["store"]["dermantin"],
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const chat = await this.orderRepo.preload({ id, ...updateOrderDto });

    if (!chat) {
      throw new NotFoundException("Bunday order yo'q");
    }

    return this.orderRepo.save(chat);
  }

  async remove(id: number) {
    const chat = await this.orderRepo.findOneBy({ id });

    if (!chat) {
      throw new NotFoundException("data doesn't exsist");
    }

    await this.orderRepo.delete(id);
    return { message: "Deleted succesfully" };
  }
}
