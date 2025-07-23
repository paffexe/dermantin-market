import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { MailModule } from "../mail/mail.module";
import { UserModule } from "../user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminModule } from "../admin/admin.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([]),
    JwtModule,
    MailModule,
    UserModule,
    AdminModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
