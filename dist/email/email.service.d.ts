import { JwtService } from "@nestjs/jwt";
import { AdminService } from "src/admin/admin.service";
import { ConfigService } from "@nestjs/config";
export declare class EmailService {
    private readonly jwtService;
    private readonly adminService;
    private readonly configService;
    private readonly logger;
    private resend;
    constructor(jwtService: JwtService, adminService: AdminService, configService: ConfigService);
    private compileTemplate;
    sendVerificationLink(email: string): Promise<import("resend").CreateEmailResponse>;
    confirmEmail(email: string): Promise<void>;
    decodeConfirmationToken(token: string): Promise<any>;
    resendConfirmationLink(email: string): Promise<void>;
}
