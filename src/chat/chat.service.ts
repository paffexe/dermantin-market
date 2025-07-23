import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Chat } from "./entities/chat.entity";
import { CreateChatDto } from "./dto/create-chat.dto";
import { User } from "../user/entities/user.entity";
import { Store } from "../store/entities/store.entity";
import { UpdateChatDto } from "./dto/update-chat.dto";

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepo: Repository<Chat>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Store)
    private readonly storeRepo: Repository<Store>
  ) {}

  async create(createChatDto: CreateChatDto) {
    const user = await this.userRepo.findOneBy({ id: createChatDto.userId });

    if (!user) {
      throw new BadRequestException("Bunday user yo'q");
    }

    const store = await this.storeRepo.findOneBy({ id: createChatDto.storeId });

    if (!store) {
      throw new BadRequestException("Bunday store yo'q");
    }

    const chat = this.chatRepo.create({ user, store });
    return this.chatRepo.save(chat);
  }

  findAll() {
    return this.chatRepo.find({ relations: ["user"]["store"] });
  }

  findOne(id: number) {
    return this.chatRepo.find({ relations: ["user"]["store"] });
  }

  async update(id: number, updateChatDto: UpdateChatDto) {
    const chat = await this.chatRepo.preload({ id, ...updateChatDto });

    if (!chat) {
      throw new NotFoundException("Bunday chat yo'q");
    }

    return this.chatRepo.save(chat);
  }

  async remove(id: number) {
    const chat = await this.chatRepo.findOneBy({ id });

    if (!chat) {
      throw new NotFoundException("data doesn't exsist");
    }

    await this.chatRepo.delete(id);
    return { message: "Deleted succesfully" };
  }
}
