import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserTokenPayload } from "src/types/access-token.type";
import { compareSync, hashSync } from "bcrypt";
import { AdminService } from "src/admin/admin.service";
import { Admin } from "src/entity/admin.entity";
import { EmailService } from "src/email/email.service";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private adminService: AdminService,
    private emailVerifyService: EmailService
  ) {}

  async validateUser(email: string, password: string) {
    const validatedAdmin = await this.adminService.findAdminByEmail(email);
    if (!validatedAdmin) return undefined;

    const isPasswordValid = compareSync(password, validatedAdmin.password);

    if (!validatedAdmin.isVerified) {
      throw new UnauthorizedException("Please verify your email first");
    }

    if (validatedAdmin && isPasswordValid) {
      const { password, ...result } = validatedAdmin;
      return result;
    }
  }

  async findByEmail(email: string): Promise<Admin | null> {
    return this.adminService.findAdminByEmail(email);
  }

  async login(payload: UserTokenPayload): Promise<{ access_token: string }> {
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(adminData: Partial<Admin>) {
    const adminExists = await this.adminService.findAdminByEmail(
      adminData.email!
    );
    if (adminExists) {
      throw new Error("User already exists");
    }
    const newAdmin = await this.adminService.createAdmin({
      ...adminData,
      password: hashSync(adminData.password!, 10),
    });

    await this.emailVerifyService.sendVerificationLink(newAdmin.email);

    const { password, ...result } = newAdmin;
    return {
      ...result,
      message:
        "Registration successful. Please check your email for verification.",
      access_token: this.jwtService.sign({ email: newAdmin.email }),
    };
  }
}
