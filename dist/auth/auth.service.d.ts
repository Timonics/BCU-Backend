import { JwtService } from "@nestjs/jwt";
import { UserTokenPayload } from "src/types/access-token.type";
import { AdminService } from "src/admin/admin.service";
import { Admin } from "src/entity/admin.entity";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { ConfigService } from "@nestjs/config";
export declare class AuthService {
    private readonly jwtService;
    private readonly adminService;
    private readonly configService;
    private readonly eventEmitter;
    private readonly isProduction;
    constructor(jwtService: JwtService, adminService: AdminService, configService: ConfigService, eventEmitter: EventEmitter2);
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
        access_token: Promise<{
            access_token: string;
        }>;
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        isVerified: boolean;
    }>;
}
