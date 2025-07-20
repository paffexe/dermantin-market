import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import * as bcrypt from "bcrypt";
import { MailService } from "../mail/mail.service";
import { UserService } from "../user/user.service";
import { User } from "../user/entities/user.entity";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { SigninUserDto } from "../user/dto/sign-in-user";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UserService,
    private readonly mailService: MailService
    // private readonly adminService: AdminService
  ) {}

  async generateTokens(user: User) {
    const payload = {
      id: user.id,
      is_verified: user.is_verified,
      role: user.role,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  // async generateAdminToken(admin: Admin) {
  //   const payload = {
  //     id: admin.id,
  //     is_creator: admin.is_creator,
  //     is_active: admin.is_active,
  //   };

  //   const [accessToken, refreshToken] = await Promise.all([
  //     this.jwtService.signAsync(payload, {
  //       secret: process.env.ADMIN_ACCESS_TOKEN_KEY,
  //       expiresIn: process.env.ADMIN_ACCESS_TOKEN_TIME,
  //     }),
  //     this.jwtService.signAsync(payload, {
  //       secret: process.env.ADMIN_REFRESH_TOKEN_KEY,
  //       expiresIn: process.env.ADMIN_REFRESH_TOKEN_TIME,
  //     }),
  //   ]);

  //   return {
  //     accessToken,
  //     refreshToken,
  //   };
  // }

  async signup(createUserDto: CreateUserDto) {
    const candidate = await this.usersService.findUserByEmail(
      createUserDto.email
    );
    if (candidate) {
      throw new ConflictException("Bunday foydalanuvchi mavjud");
    }
    const newUser = await this.usersService.create(createUserDto);
    //sendMail
    try {
      await this.mailService.sendMail(newUser);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException("Emailga xat yuborishda xatolik");
    }

    return {
      message:
        "Ro'yxatdan o'tdingiz. Accountni faollashtirish uchun emailni tasdiqlang!",
    };
  }

  async signin(signinUserDto: SigninUserDto, res: Response) {
    const user = await this.usersService.findUserByEmail(signinUserDto.email);

    if (!user) {
      throw new UnauthorizedException("Email yoki password noto'g'ri");
    }

    const isMatched = await bcrypt.compare(
      signinUserDto.code,
      user.activation_code
    );

    if (!isMatched) {
      throw new UnauthorizedException("Email yoki password noto'g'ri");
    }

    const { accessToken, refreshToken } = await this.generateTokens(user);
    user.refresh_token = await bcrypt.hash(refreshToken, 7);
    await this.usersService.save(user);

    res.cookie("refreshToken", refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });

    return { message: "Tizimga xush kelibsiz", id: user.id, accessToken };
  }

  async signout(refreshToken: string, res: Response) {
    let userData: any;

    try {
      userData = await this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }

    if (!userData) {
      throw new ForbiddenException("User not verified");
    }

    await this.usersService.updateRefreshToken(userData.id, "");

    res.clearCookie("refreshToken");
    return {
      message: "User logged out successfully",
    };
  }

  //for admin
  // async register(createAdminDto: CreateAdminDto) {
  //   const candidate = await this.adminService.findByEmail(createAdminDto.email);

  //   if (candidate) {
  //     throw new ConflictException("Admin with this email exsists");
  //   }
  //   await this.adminService.create(createAdminDto);
  // }

  // async login(signinAdminDto: RegisterAdminDtoDto, res: Response) {
  //   const admin = await this.adminService.findByEmail(signinAdminDto.email);
  //   if (!admin) {
  //     throw new UnauthorizedException("Email yoki password noto'g'ri");
  //   }

  //   const isMatched = await bcrypt.compare(
  //     signinAdminDto.password,
  //     admin.password
  //   );

  //   if (!isMatched) {
  //     throw new UnauthorizedException("Email yoki password noto'g'ri");
  //   }

  //   if (admin.is_active == false) {
  //     admin.id;
  //     admin.is_active = true;
  //     await admin.save();
  //   }

  //   const { accessToken, refreshToken } = await this.generateAdminToken(admin);

  //   admin.refresh_token = await bcrypt.hash(refreshToken, 7);
  //   await admin.save();

  //   res.cookie("refreshToken", refreshToken, {
  //     maxAge: +process.env.ADMIN_COOKIE_TIME!,
  //     httpOnly: true,
  //   });
  //   console.log(admin.is_creator);
  //   return { message: "Tizimga xush kelibsiz!", id: admin.id, accessToken };
  // }

  // async activate(activation_link: string) {
  //   return this.usersService.activateUser(activation_link);
  // }

  async refreshToken(
    userId: number,
    refreshTokenFromCookie: string,
    res: Response
  ) {
    const decodedToken = await this.jwtService.decode(refreshTokenFromCookie);

    if (userId !== decodedToken["id"]) {
      throw new ForbiddenException("Ruxsat etilmagan");
    }

    const user = await this.usersService.findOne(userId);

    if (!user || !user.refresh_token) {
      throw new NotFoundException("User not found");
    }

    const { accessToken, refreshToken } = await this.generateTokens(user);

    const refresh_token = await bcrypt.hash(refreshToken, 7);
    await this.usersService.updateRefreshToken(user.id, refresh_token);

    res.cookie("refreshToken", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    const response = {
      message: "User refreshed",
      userId: user.id,
      accessToken: accessToken,
    };
    return response;
  }
}
