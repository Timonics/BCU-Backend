import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class LoginAdminDto {
  @ApiProperty({
    description: 'Admin email address',
    example: 'admin@church.org',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      'Admin password (min 8 chars, 1 lowercase, 1 uppercase, 1 number)',
    example: 'SecurePass123',
    required: true,
    minLength: 8,
    format: 'password',
  })
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  })
  password: string;
}
