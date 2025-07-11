import { JwtService } from "@nestjs/jwt";
import { AccessTokenPayload } from "src/types/access-token.type";
import { AdminService } from "src/admin/admin.service";
import { Admin } from "src/entity/admin.entity";
export declare class AuthService {
    private jwtService;
    private adminService;
    constructor(jwtService: JwtService, adminService: AdminService);
    validateUser(email: string, passowrd: string): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
    } | undefined>;
    findByEmail(email: string): Promise<Admin | null>;
    login(payload: AccessTokenPayload): Promise<{
        access_token: string;
    }>;
    register(adminData: Partial<Admin>): Promise<{
        access_token: string;
        id: number;
        firstName: string;
        lastName: string;
        email: string;
    }>;
}
