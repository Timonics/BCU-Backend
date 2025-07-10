import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthService } from './auth.service';
import { LoginAdminDto } from './dto/login.dto';
import { CreateAdminDto } from './dto/register.dto';
import { config } from 'dotenv';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiUnauthorizedResponse,
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

config();

@Public()
@ApiTags('Authentication')
@Controller(`${process.env.API}auth`)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Admin login',
    description: 'Authenticates admin and returns JWT token',
  })
  @ApiBody({
    type: LoginAdminDto,
    description: 'Admin credentials',
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    schema: {
      type: 'object',
      properties: {
        access_token: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
  })
  @ApiBadRequestResponse({
    description: 'Validation error',
  })
  async login(@Body() loginData: LoginAdminDto): Promise<{
    access_token: string;
  }> {
    const loggedUser = await this.authService.validateUser(
      loginData.email,
      loginData.password,
    );
    if (!loggedUser) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login({
      id: loggedUser.id,
      email: loggedUser.email,
    });
  }

  @Post('register')
  @ApiOperation({
    summary: 'Admin registration',
    description: 'Creates a new admin account (restricted to super admins)',
  })
  @ApiBody({
    type: CreateAdminDto,
    description: 'New admin details',
  })
  @ApiCreatedResponse({
    description: 'Admin created successfully',
    type: CreateAdminDto,
  })
  @ApiConflictResponse({
    description: 'Email already exists',
  })
  @ApiBadRequestResponse({
    description: 'Validation error',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized (requires admin privileges)',
  })
  async register(@Body() signupData: CreateAdminDto) {
    return this.authService.register(signupData);
  }
}
