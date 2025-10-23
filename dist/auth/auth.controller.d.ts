import { AuthService } from "./auth.service";
import { LoginAdminDto } from "./dto/login.dto";
import { CreateAdminDto } from "./dto/register.dto";
import { Response } from "express";
import { EmailService } from "src/email/email.service";
export declare class AuthController {
    private readonly authService;
    private readonly emailVerifyService;
    constructor(authService: AuthService, emailVerifyService: EmailService);
    login(loginData: LoginAdminDto): Promise<{
        access_token: string;
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        isVerified: boolean;
    }>;
    register(signupData: CreateAdminDto): Promise<{
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
    confirm(token: string, res: Response): Promise<void>;
    resendConfirmationLink(email: string): Promise<{
        message: string;
    }>;
}
