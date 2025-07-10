import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsEnum,
  IsISO8601,
  IsString,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { Gender } from 'src/utils/enums/gender.enum';

export class CreateBandDto {
  @ApiProperty({
    description: 'Name of the band',
    example: 'Praise Team',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Gender composition of the band (converted to lowercase)',
    enum: Gender,
    example: 'male',
  })
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.toLowerCase())
  @IsEnum(Gender, { message: 'Gender must either be male or female' })
  gender: Gender;

  @ApiProperty({
    description: 'Founding date of the band in ISO8601 format',
    example: '2020-01-15',
    required: true,
  })
  @IsNotEmpty({ message: 'Founding date cannot be empty' })
  @IsISO8601({ strict: true, strictSeparator: true })
  foundingDate: string;

  @ApiPropertyOptional({
    description: 'ID of the band captain',
    example: 42,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  bandCaptainId?: number;
}
