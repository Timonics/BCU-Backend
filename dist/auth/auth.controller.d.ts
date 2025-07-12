import { AuthService } from "./auth.service";
import { LoginAdminDto } from "./dto/login.dto";
import { CreateAdminDto } from "./dto/register.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
        access_token: string;
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        isVerified: boolean;
    }>;
}
