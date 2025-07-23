import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";

export enum RequestStatus {
  PENDING = "pending",
  REJECTED = "rejected",
  ACCEPTED = "accepted",
}

registerEnumType(RequestStatus, {
  name: "RequestStatus",
});

@ObjectType()
@Entity()
export class Request {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  text: string;

  @Column({ type: "enum", enum: RequestStatus, default: RequestStatus.PENDING })
  @Field(() => RequestStatus)
  status: RequestStatus;

  @ManyToOne(() => User, (user) => user.requests)
  @Field(() => User)
  user: User;
}
