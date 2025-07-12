import { MailerService } from "@nestjs-modules/mailer";
import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AdminService } from "src/admin/admin.service";
import * as dotenv from "dotenv";

dotenv.config();

@Injectable()
export class EmailService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly adminService: AdminService
  ) {}

  sendVerificationLink(email: string) {
    const payload = { email };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
      expiresIn: `${process.env.JWT_VERIFICATION_TOKEN_EXPIRATION_TIME}s`,
    });

    const url = `${process.env.EMAIL_CONFIRMATION_URL}?token=${token}`;

    return this.mailerService.sendMail({
      to: email,
      subject: "BCU Email Verification",
      template: "email-confirmation",
      context: {
        url,
        email,
      },
    });
  }

  async confirmEmail(email: string) {
    const userExists = await this.adminService.findAdminByEmail(email);
    if (userExists?.isVerified) {
      throw new BadRequestException("Email already confirmed");
    }
    await this.adminService.markEmailAsVerified(email);
  }

  async decodeConfirmationToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
      });
      if (typeof payload === "object" && "email" in payload) {
        return payload.email;
      }
      throw new BadRequestException();
    } catch (error) {
      if (error?.name === "TokenExpiredError") {
        throw new BadRequestException("Email confirmation token expired");
      }
      throw new BadRequestException("Bad confirmation token");
    }
  }

  async resendConfirmationLink(userId: number) {
    const admin = await this.adminService.findById(userId);
    if (admin?.isVerified) {
      throw new BadRequestException("Email already confirmed");
    }
    await this.sendVerificationLink(admin!.email);
  }
}
