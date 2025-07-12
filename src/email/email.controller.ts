import { Controller, Get, Query, Res } from "@nestjs/common";
import { Public } from "src/common/decorators/public.decorator";
import { EmailService } from "./email.service";
import { GetUser } from "src/common/decorators/user.decorator";
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { Response } from "express";

@ApiTags("Email Verification")
@Controller("email-verification")
export class EmailController {
  constructor(private readonly emailVerifyService: EmailService) {}

  @Public()
  @Get("confirm")
  @ApiOperation({ summary: "Confirm email address with verification token" })
  @ApiQuery({
    name: "token",
    required: true,
    description: "Verification token sent to user email",
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  })
  @ApiResponse({
    status: 200,
    description: "Email successfully verified",
  })
  @ApiResponse({
    status: 400,
    description: "Invalid or expired token",
  })
  async confirm(@Query("token") token: string, @Res() res: Response) {
    const email = await this.emailVerifyService.decodeConfirmationToken(token);
    await this.emailVerifyService.confirmEmail(email);

    res.redirect(`${process.env.FRONTEND_URL}/auth/email-verified`);
  }

  @Get("resend")
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Resend verification email" })
  @ApiResponse({
    status: 200,
    description: "Verification email resent successfully",
    schema: {
      example: { message: "Verification email resent" },
    },
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized",
  })
  async resendConfirmationLink(@GetUser("id") id: number) {
    await this.emailVerifyService.resendConfirmationLink(id);
    return { message: "Verification email resent" };
  }
}
