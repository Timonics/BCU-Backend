import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Member } from './member.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Unit {
  @ApiProperty({
    example: 1,
    description: 'Auto-generated unique identifier',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Name of the unit',
    example: 'IT Unit',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Date when the unit was founded (YYYY-MM-DD)',
    example: '1990-01-15',
  })
  @Column({ type: 'date' })
  foundingDate: Date;

  @ApiProperty({
    description: 'The member who heads this unit',
    type: () => Member,
    required: false,
  })
  @OneToOne(() => Member, { nullable: true })
  @JoinColumn()
  unitHead?: Member;

  @ApiProperty({
    description: 'List of members belonging to this unit',
    type: () => [Member],
    isArray: true,
  })
  @OneToMany(() => Member, (member) => member.unit)
  members: Member[];
}
