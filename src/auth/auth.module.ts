import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { MailModule } from "../mail/mail.module";
import { UserModule } from "../user/user.module";

@Module({
  imports: [JwtModule.register({}), UserModule, MailModule, ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
