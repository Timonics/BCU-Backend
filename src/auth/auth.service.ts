import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserTokenPayload } from "src/types/access-token.type";
import { compareSync, hashSync } from "bcrypt";
import { AdminService } from "src/admin/admin.service";
import { Admin } from "src/entity/admin.entity";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { UserRegisteredEvent } from "src/events/user-registered.events";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  private readonly isProduction: boolean;

  constructor(
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService,
    private readonly configService: ConfigService,
    private readonly eventEmitter: EventEmitter2
  ) {
    this.isProduction =
      this.configService.get<string>("NODE_ENV") === "production";
  }

  async validateUser(email: string, password: string) {
    const validatedAdmin = await this.findByEmail(email);
    if (!validatedAdmin) return undefined;

    const isPasswordValid = compareSync(password, validatedAdmin.password);

    if (!validatedAdmin.isVerified && this.isProduction) {
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
    const adminExists = await this.findByEmail(adminData.email!);
    if (adminExists) {
      throw new NotAcceptableException("User already exists");
    }
    const newAdmin = await this.adminService.createAdmin({
      ...adminData,
      password: hashSync(adminData.password!, 10),
    });

    this.eventEmitter.emit(
      "user.registered",
      new UserRegisteredEvent(newAdmin.email)
    );

    const { password, ...result } = newAdmin;
    return {
      ...result,
      message:
        "Registration successful. Please check your email for verification.",
      access_token: this.login({ email: newAdmin.email }),
    };
  }
}
