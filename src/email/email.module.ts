import { Module } from "@nestjs/common";
import { EmailService } from "./email.service";
import { JwtModule } from "@nestjs/jwt";
import { MailerModule } from "@nestjs-modules/mailer";
import { AdminModule } from "src/admin/admin.module";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { join } from "path";
import { ConfigService } from "@nestjs/config";
import { UserRegisteredListener } from "./listeners/user.register.listener";

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_VERIFICATION_TOKEN_SECRET"),
        signOptions: {
          expiresIn: `${configService.get<string>("JWT_VERIFICATION_TOKEN_EXPIRATION_TIME")}s`,
        },
      }),
      inject: [ConfigService],
    }),
    AdminModule,
  ],
  providers: [EmailService, UserRegisteredListener],
  exports: [EmailService],
})
export class EmailModule {}
