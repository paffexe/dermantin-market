import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";
import { OrderService } from "./order.service";
import { Order } from "./entities/order.entity";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Query(() => [Order])
  findAllOrders() {
    return this.orderService.findAll();
  }

  @Query(() => Order)
  findOneOrder(@Args("id", { type: () => ID }) id: number) {
    return this.orderService.findOne(id);
  }

  @Mutation(() => Order)
  createOrder(@Args("createOrder") createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Mutation(() => Order)
  updateOrder(
    @Args("id", { type: () => ID }) id: number,
    @Args("updateOrder") updateOrderDto: UpdateOrderDto
  ) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Mutation(() => String)
  removeOrder(@Args("id", { type: () => ID }) id: number) {
    return this.orderService.remove(id);
  }
}
