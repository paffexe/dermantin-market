import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, ID } from "@nestjs/graphql";
import { User } from "../../user/entities/user.entity";
import { Store } from "../../store/entities/store.entity";
import { Message } from "../../message/entities/message.entity";

@ObjectType()
@Entity()
export class Chat {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.chats)
  @Field(() => User)
  user: User;

  @ManyToOne(() => Store, (store) => store.chats)
  @Field(() => Store)
  store: Store;

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];
}
