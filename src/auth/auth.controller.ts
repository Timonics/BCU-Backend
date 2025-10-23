import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UnauthorizedException,
} from "@nestjs/common";
import { Public } from "src/common/decorators/public.decorator";
import { AuthService } from "./auth.service";
import { LoginAdminDto } from "./dto/login.dto";
import { CreateAdminDto } from "./dto/register.dto";
import { Response } from "express";
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiUnauthorizedResponse,
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiBadRequestResponse,
  ApiQuery,
} from "@nestjs/swagger";
import { EmailService } from "src/email/email.service";

@Public()
@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly emailVerifyService: EmailService
  ) {}

  @Post("login")
  @ApiOperation({
    summary: "Admin login",
    description: "Authenticates admin and returns JWT token",
  })
  @ApiBody({
    type: LoginAdminDto,
    description: "Admin credentials",
  })
  @ApiResponse({
    status: 200,
    description: "Login successful",
    schema: {
      type: "object",
      properties: {
        access_token: {
          type: "string",
          example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: "Invalid credentials",
  })
  @ApiBadRequestResponse({
    description: "Validation error",
  })
  async login(@Body() loginData: LoginAdminDto) {
    const userExists = await this.authService.findByEmail(loginData.email);
    if (!userExists) {
      throw new BadRequestException("This email does not exist");
    }

    const loggedUser = await this.authService.validateUser(
      loginData.email,
      loginData.password
    );
    if (!loggedUser) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const token = await this.authService.login({
      email: loggedUser.email,
    });

    const { password, ...userDetails } = userExists;
    return {
      ...userDetails,
      ...token,
    };
  }

  @Post("register")
  @ApiOperation({
    summary: "Admin registration",
    description: "Creates a new admin account (restricted to super admins)",
  })
  @ApiBody({
    type: CreateAdminDto,
    description: "New admin details",
  })
  @ApiCreatedResponse({
    description: "Admin created successfully",
    type: CreateAdminDto,
  })
  @ApiConflictResponse({
    description: "Email already exists",
  })
  @ApiBadRequestResponse({
    description: "Validation error",
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized (requires admin privileges)",
  })
  async register(@Body() signupData: CreateAdminDto) {
    return this.authService.register(signupData);
  }

  @Get("verify")
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
  @ApiOperation({ summary: "Resend verification email" })
  @ApiQuery({
    name: "email",
    required: true,
    description: "Email to resend verification link",
    example: "olubiyioderinde7@gmail.com",
  })
  @ApiResponse({
    status: 200,
    description: "Verification email resent successfully",
    schema: {
      example: { message: "Verification email resent" },
    },
  })
  @ApiResponse({
    status: 401,
    description: "Email not sent",
  })
  async resendConfirmationLink(@Query("email") email: string) {
    await this.emailVerifyService.resendConfirmationLink(email);
    return { message: "Verification email resent" };
  }
}
