import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AccessTokenPayload } from "src/types/access-token.type";
import { compareSync, hashSync } from "bcrypt";
import { AdminService } from "src/admin/admin.service";
import { Admin } from "src/entity/admin.entity";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private adminService: AdminService
  ) {}

  async validateUser(email: string, passowrd: string) {
    const validatedAdmin = await this.adminService.findAdminByEmail(email);

    if (validatedAdmin && compareSync(passowrd, validatedAdmin.password)) {
      const { password, ...result } = validatedAdmin;
      return result;
    }
  }

  async findByEmail(email: string): Promise<Admin | null> {
    return this.adminService.findAdminByEmail(email);
  }

  async login(payload: AccessTokenPayload): Promise<{ access_token: string }> {
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

    const { password, ...result } = newAdmin;
    return {
      ...result,
      access_token: this.jwtService.sign({ email: newAdmin.email }),
    };
  }
}
