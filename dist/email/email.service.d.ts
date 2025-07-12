import { MailerService } from "@nestjs-modules/mailer";
import { JwtService } from "@nestjs/jwt";
import { AdminService } from "src/admin/admin.service";
export declare class EmailService {
    private readonly jwtService;
    private readonly mailerService;
    private readonly adminService;
    constructor(jwtService: JwtService, mailerService: MailerService, adminService: AdminService);
    sendVerificationLink(email: string): Promise<SentMessageInfo>;
    confirmEmail(email: string): Promise<void>;
    decodeConfirmationToken(token: string): Promise<any>;
    resendConfirmationLink(userId: number): Promise<void>;
}
