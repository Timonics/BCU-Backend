import { EmailService } from "../email.service";
import { UserRegisteredEvent } from "src/events/user-registered.events";
export declare class UserRegisteredListener {
    private readonly emailService;
    private readonly logger;
    constructor(emailService: EmailService);
    handleUserRegistered(event: UserRegisteredEvent): Promise<void>;
}
