import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>
  ) {}
  create(createUserDto: CreateUserDto) {
    return this.userRepo.save(createUserDto);
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findOneBy({ id });
  }

  findUserByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.preload({ id, ...updateUserDto });
    if (!user) {
      throw new NotFoundException(`Bunday ${id}-lik user yo'q`);
    }
    return this.userRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepo.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    await this.userRepo.delete(id);
    return { message: `User with id ${id} has been removed` };
  }

  async updateRefreshToken(id: number, refresh_token: string) {
    const updatedUser = await this.userRepo.update({ refresh_token }, { id });
    return updatedUser;
  }

  async save(user: User) {
    return this.userRepo.save(user);
  }
}
