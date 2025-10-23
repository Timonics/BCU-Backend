import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AdminService } from "src/admin/admin.service";
import { ConfigService } from "@nestjs/config";
import { Resend } from "resend";
import * as path from "path";
import * as fs from "fs-extra";
import * as handlebars from "handlebars";

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private resend: Resend;

  constructor(
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService,
    private readonly configService: ConfigService
  ) {
    this.resend = new Resend(this.configService.get("RESEND_API_KEY"));
  }

  private async compileTemplate(
    templateName: string,
    context: Record<string, any>
  ): Promise<string> {
    const templatePath = path.join(
      __dirname,
      "templates",
      `${templateName}.hbs`
    );
    const templateContent = await fs.readFile(templatePath, "utf-8");
    const template = handlebars.compile(templateContent);
    return template(context);
  }

  async sendVerificationLink(email: string) {
    const payload = { email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>("JWT_VERIFICATION_TOKEN_SECRET"),
      expiresIn: `${this.configService.get<string>("JWT_VERIFICATION_TOKEN_EXPIRATION_TIME")}s`,
    });

    const url = `${this.configService.get<string>("EMAIL_CONFIRMATION_URL")}?token=${token}`;

    const html = await this.compileTemplate("email-confirmation", {
      url,
      email,
    });

    const from =
      this.configService.get<string>("RESEND_FROM_EMAIL") || "BCU <onboarding@resend.dev>";

    try {
      const data = await this.resend.emails.send({
        from,
        to: email,
        subject: "BCU Email Verification",
        html,
      });

      this.logger.log("Verification email sent");
      return data;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException("Error sending verification email");
    }
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
        secret: this.configService.get<string>("JWT_VERIFICATION_TOKEN_SECRET"),
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

  async resendConfirmationLink(email: string) {
    const admin = await this.adminService.findAdminByEmail(email);
    if (admin?.isVerified) {
      throw new BadRequestException("Email already confirmed");
    }
    this.logger.log(`Resending email to ${admin!.email}`);
    await this.sendVerificationLink(admin!.email);
  }
}
