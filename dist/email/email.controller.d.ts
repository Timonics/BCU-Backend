import { EmailService } from "./email.service";
import { Response } from "express";
export declare class EmailController {
    private readonly emailVerifyService;
    constructor(emailVerifyService: EmailService);
    confirm(token: string, res: Response): Promise<void>;
    resendConfirmationLink(id: number): Promise<{
        message: string;
    }>;
}
