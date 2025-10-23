import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    description: 'Admin first name',
    example: 'Oderinde',
    required: true,
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'Admin last name',
    example: 'Michael',
    required: true,
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'Admin email address',
    example: 'olubiyioderinde7@gmail.com',
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
    format: 'password', // Swagger will show password field as masked
  })
  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 0,
  })
  password: string;
}
