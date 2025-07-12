import {
  IsNotEmpty,
  IsISO8601,
  IsString,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { Member } from 'src/entity/member.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUnitDto {
  @ApiProperty({
    description: 'Name of the unit',
    example: 'Praise Team',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Founding date of the unit in ISO8601 format',
    example: '2020-01-15',
    required: true,
  })
  @IsNotEmpty({ message: 'Founding date cannot be empty' })
  @IsISO8601({ strict: true, strictSeparator: true })
  foundingDate: string;

  @ApiPropertyOptional({
    description: 'ID of the unit head (member who leads this unit)',
    example: 1,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  unitHeadId?: number;
}
