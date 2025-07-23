import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Chat } from "../../chat/entities/chat.entity";

@ObjectType()
@Entity()
export class Message {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  text: string;

  @Field()
  @Column({ default: false })
  is_read: boolean;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  @Field(() => Chat)
  chat: Chat;
}
