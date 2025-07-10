import { LeadershipType } from 'src/utils/enums/leadership_type.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Member } from './member.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class LeadershipPosition {
  @ApiProperty({
    example: 1,
    description: 'Auto-generated unique identifier',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    enum: LeadershipType,
    example: LeadershipType.CAPTAIN,
    description: 'Leadership type',
  })
  @Column({ type: 'enum', enum: LeadershipType, unique: true })
  type: LeadershipType;

  @ApiProperty({
    example: '1995-07-21',
    description: 'Date when the position was established',
    type: 'string',
    format: 'date',
  })
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  appointedAt: Date;
}
