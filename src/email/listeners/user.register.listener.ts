import { Injectable, Logger } from "@nestjs/common";
import { EmailService } from "../email.service";
import { OnEvent } from "@nestjs/event-emitter";
import { UserRegisteredEvent } from "src/events/user-registered.events";

@Injectable()
export class UserRegisteredListener {
  private readonly logger = new Logger(UserRegisteredListener.name);

  constructor(private readonly emailService: EmailService) {}

  @OnEvent("user.registered")
  async handleUserRegistered(event: UserRegisteredEvent) {
    this.logger.log(`Sending verification email to ${event.email}`);
    await this.emailService.sendVerificationLink(event.email);
  }
}
