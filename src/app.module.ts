import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { CategoryModule } from './category/category.module';
import { ImagesModule } from './images/images.module';
import { ReviewModule } from './review/review.module';
import { MessageModule } from './message/message.module';
import { AdvertisementModule } from './advertisement/advertisement.module';
import { DermantinModule } from './dermantin/dermantin.module';
import { RequestModule } from './request/request.module';
import { ChatModule } from './chat/chat.module';
import { StoreModule } from './store/store.module';
import { HistoryModule } from './history/history.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql",
      sortSchema: true,
      playground: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: config.get<"postgres">("DB_CONNECTION"),
        host: config.get<string>("DB_HOST"),
        username: config.get<string>("DB_USERNAME"),
        password: config.get<string>("DB_PASSWORD"),
        port: config.get<number>("DB_PORT"),
        name: config.get<string>("DB_NAME"),
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        autoLoadEntities: true,
        logging: true,
        synchronize: true,
      }),
    }),
    UserModule,
    AuthModule,
    AdminModule,
    CategoryModule,
    ImagesModule,
    ReviewModule,
    MessageModule,
    AdvertisementModule,
    DermantinModule,
    RequestModule,
    ChatModule,
    StoreModule,
    HistoryModule,
    OrderModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
