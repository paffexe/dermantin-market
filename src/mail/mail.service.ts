import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { User } from "../user/entities/user.entity";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(user: User) {
    const code = `${user.activation_code}`;
    console.log(code);

    await this.mailerService.sendMail({
      to: user.email,
      subject: "This is your code",
      template: "./confirmation",
      context: {
        username: user.full_name,
        code,
      },
    });
  }
}
