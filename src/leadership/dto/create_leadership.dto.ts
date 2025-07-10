import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum } from 'class-validator';
import { LeadershipType } from 'src/utils/enums/leadership_type.enum';

export class CreateLeadershipDto {
  @ApiProperty({
    enum: LeadershipType,
    description: 'Type of leadership position',
    default: LeadershipType.CAPTAIN,
  })
  @Transform(({ value }: { value: string }) => value.toLowerCase())
  @IsEnum(LeadershipType, { message: 'Position can not be empty' })
  type: LeadershipType;
}
