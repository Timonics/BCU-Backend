import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsISO8601, IsOptional, IsNumber } from 'class-validator';

export class UpdateUnitDto {
  @ApiPropertyOptional({
    description: 'Name of the unit',
    example: 'Praise Team',
    required: true,
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Founding date of the unit in ISO8601 format',
    example: '2020-01-15',
    required: true,
  })
  @IsOptional({ message: 'Founding date cannot be empty' })
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
