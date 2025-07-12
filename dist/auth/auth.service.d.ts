import { JwtService } from "@nestjs/jwt";
import { UserTokenPayload } from "src/types/access-token.type";
import { AdminService } from "src/admin/admin.service";
import { Admin } from "src/entity/admin.entity";
import { EmailService } from "src/email/email.service";
export declare class AuthService {
    private jwtService;
    private adminService;
    private emailVerifyService;
    constructor(jwtService: JwtService, adminService: AdminService, emailVerifyService: EmailService);
    validateUser(email: string, password: string): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        isVerified: boolean;
    } | undefined>;
    findByEmail(email: string): Promise<Admin | null>;
    login(payload: UserTokenPayload): Promise<{
        access_token: string;
    }>;
    register(adminData: Partial<Admin>): Promise<{
        message: string;
        access_token: string;
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        isVerified: boolean;
    }>;
}
