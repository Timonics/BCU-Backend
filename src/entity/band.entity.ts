import { Gender } from 'src/utils/enums/gender.enum';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Member } from './member.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Band {
  @ApiProperty({
    example: 1,
    description: 'Auto-generated unique identifier',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Joseph Band', description: 'Name of band' })
  @Column()
  name: string;

  @ApiProperty({
    enum: Gender,
    example: Gender.MALE,
    description: 'Gender classification of the band',
  })
  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @ApiProperty({
    description: 'Date when the band was established in YYYY-MM-DD format',
    example: '1990-01-15',
  })
  @Column({
    type: 'date',
    transformer: {
      to: (value: string) => value,
      from: (value: string) => value,
    },
  })
  foundingDate: Date;

  @ApiProperty({
    type: () => [Member],
    isArray: true,
    description: 'Array of members belonging to this band',
    required: false,
  })
  @OneToMany(() => Member, (member) => member.band)
  members: Member[];

  @ApiProperty({
    type: () => Member,
    description: 'The captain/leader of this band',
    required: false,
  })
  @OneToOne(() => Member, { nullable: true })
  @JoinColumn()
  bandCaptain?: Member;
}
