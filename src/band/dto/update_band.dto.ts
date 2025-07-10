import { Transform } from 'class-transformer';
import {
  IsString,
  IsEnum,
  IsISO8601,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { Gender } from 'src/utils/enums/gender.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateBandDto {
  @ApiPropertyOptional({
    description: 'Name of the band',
    example: 'Worship Team Alpha',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Gender composition of the band (converted to lowercase)',
    enum: Gender,
    example: 'male',
  })
  @IsOptional()
  @Transform(({ value }: { value: string }) => value.toLowerCase())
  @IsEnum(Gender, { message: 'Gender must either be male or female' })
  gender: Gender;

  @ApiPropertyOptional({
    description: 'Founding date of the band in ISO8601 format (YYYY-MM-DD)',
    example: '2018-05-20',
  })
  @IsOptional()
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
