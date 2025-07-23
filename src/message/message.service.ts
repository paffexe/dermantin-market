import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Message } from "./entities/message.entity";
import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { Chat } from "../chat/entities/chat.entity";

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
    @InjectRepository(Chat)
    private readonly chatRepo: Repository<Chat>
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    const chat = await this.chatRepo.findOneBy({ id: createMessageDto.chatId });

    if (!chat) {
      throw new BadRequestException("Bunday chat yo'q");
    }

    return this.messageRepo.save(createMessageDto);
  }

  async findAll() {
    return this.messageRepo.find({ relations: ["chat"] });
  }

  async findOne(id: number) {
    const message = await this.messageRepo.findOneBy({ id });
    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }
    return message;
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    const data = await this.messageRepo.preload({ id, ...updateMessageDto });

    if (!data) {
      throw new NotFoundException("Bunday ma'lumot yo'q");
    }

    return this.messageRepo.save(data);
  }

  async remove(id: number) {
    const data = await this.messageRepo.findOneBy({ id });

    if (!data) {
      throw new NotFoundException("Bunday ma'lumot yo'q");
    }

    return { message: "Deleted succesfully" };
  }
}
