import { Gender } from '../utils/enums/gender.enum';
import { MemberStatus } from '../utils/enums/status.enum';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  ValueTransformer,
} from 'typeorm';
import { Band } from './band.entity';
import { Unit } from './unit.entity';
import { ApiProperty } from '@nestjs/swagger';
import { LeadershipPosition } from './leadership.entity';

const dateTransformer: ValueTransformer = {
  to: (value: string) => value,
  from: (value: string) => value,
};

@Entity()
export class Member {
  @ApiProperty({
    example: 1,
    description: 'Auto-generated unique identifier',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'First name of the member',
    example: 'John',
  })
  @Column()
  firstName: string;

  @ApiProperty({
    description: 'Last name of the member',
    example: 'Doe',
  })
  @Column()
  lastName: string;

  @ApiProperty({
    description: 'Other names of the member',
    example: 'Smith',
    required: false,
  })
  @Column({ nullable: true })
  otherNames?: string;

  @ApiProperty({
    description: 'Gender of the member',
    enum: Gender,
    example: Gender.MALE,
  })
  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @ApiProperty({
    description: 'Email address of the member',
    example: 'john.doe@example.com',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    description: 'Phone number of the member',
    example: '+1234567890',
  })
  @Column()
  phoneNumber: string;

  @ApiProperty({
    description: 'Date of birth in YYYY-MM-DD format',
    example: '1990-01-15',
  })
  @Column({
    type: 'date',
    transformer: dateTransformer,
  })
  dateOfBirth: string;

  @ApiProperty({
    description: 'Marital status of the member',
    example: 'Single',
  })
  @Column()
  maritalStatus: string;

  @ApiProperty({
    description: 'State of origin',
    example: 'Lagos',
  })
  @Column()
  stateOfOrigin: string;

  @ApiProperty({
    description: 'Residential address',
    example: '123 Main Street',
  })
  @Column()
  address: string;

  @ApiProperty({
    description: 'Country of residence',
    example: 'Nigeria',
  })
  @Column()
  country: string;

  @ApiProperty({
    description: 'State of residence',
    example: 'Lagos',
  })
  @Column()
  residentialState: string;

  @ApiProperty({
    description: 'City of residence',
    example: 'Ikeja',
  })
  @Column()
  city: string;

  @ApiProperty({
    description: 'Local Government Area',
    example: 'Ikeja LGA',
  })
  @Column()
  localGovernmentArea: string;

  @ApiProperty({
    description: 'Member status',
    enum: MemberStatus,
    example: MemberStatus.PENDING,
    default: MemberStatus.PENDING,
  })
  @Column({ type: 'enum', enum: MemberStatus, default: MemberStatus.PENDING })
  status: MemberStatus;

  @ApiProperty({
    description: 'Full name of next of kin',
    example: 'Jane Doe',
    required: false,
  })
  @Column({ nullable: true })
  nextOfKinFullName: string;

  @ApiProperty({
    description: 'Relationship with next of kin',
    example: 'Spouse',
    required: false,
  })
  @Column({ nullable: true })
  nextOfKinRelationship: string;

  @ApiProperty({
    description: 'Phone number of next of kin',
    example: '+1234567891',
    required: false,
  })
  @Column({ nullable: true })
  nextOfKinPhoneNumber: string;

  @ApiProperty({
    description: 'Baptismal status',
    example: false,
    default: false,
  })
  @Column({ type: 'bool', default: false })
  baptismalStatus: boolean;

  @ApiProperty({
    description: 'Location where baptism took place',
    example: 'River Jordan Church',
    required: false,
  })
  @Column({ nullable: true })
  locationOfBaptism: string;

  @ApiProperty({
    description: 'Name of educational institution attended',
    example: 'University of Lagos',
    required: false,
  })
  @Column({ nullable: true })
  institutionName: string;

  @ApiProperty({
    description: 'Highest qualification obtained',
    example: 'B.Sc Computer Science',
    required: false,
  })
  @Column({ nullable: true })
  qualification: string;

  @ApiProperty({
    description: 'Course of study',
    example: 'Computer Science',
    required: false,
  })
  @Column({ nullable: true })
  courseOfStudy: string;

  @ApiProperty({
    description: 'Start date of education in YYYY-MM-DD format',
    example: '2010-09-01',
    required: false,
  })
  @Column({ type: 'date', transformer: dateTransformer, nullable: true })
  startDate: string;

  @ApiProperty({
    description: 'End date of education in YYYY-MM-DD format',
    example: '2014-07-15',
    required: false,
  })
  @Column({ type: 'date', transformer: dateTransformer, nullable: true })
  endDate: string;

  @ApiProperty({
    description: 'Professional qualifications',
    example: 'CIPM, PMP',
    required: false,
  })
  @Column({ nullable: true })
  professionalQualifications: string;

  @ApiProperty({
    description: 'Vocational qualifications',
    example: 'Diploma in Catering',
    required: false,
  })
  @Column({ nullable: true })
  vocationalQualification: string;

  @ApiProperty({
    description: 'Place of work',
    example: 'Tech Solutions Inc.',
    required: false,
  })
  @Column({ nullable: true })
  placeOfWork: string;

  @ApiProperty({
    description: 'Office address',
    example: '456 Business Avenue',
    required: false,
  })
  @Column({ nullable: true })
  officeAddress: string;

  @ApiProperty({
    description: 'State where work is located',
    example: 'Lagos',
    required: false,
  })
  @Column({ nullable: true })
  workState: string;

  @ApiProperty({
    description: 'LGA where work is located',
    example: 'Victoria Island LGA',
    required: false,
  })
  @Column({ nullable: true })
  workLGA: string;

  @ApiProperty({
    description: 'Country where work is located',
    example: 'Nigeria',
    required: false,
  })
  @Column({ nullable: true })
  workCountry: string;

  @ApiProperty({
    description: 'Band the member belongs to',
    type: () => Band,
    required: false,
  })
  @ManyToOne(() => Band, (band) => band.members, {
    eager: true,
    nullable: true,
  })
  band?: Band;

  @ApiProperty({
    description: 'Unit the member belongs to',
    type: () => Unit,
    required: false,
  })
  @ManyToOne(() => Unit, (unit) => unit.members, {
    eager: true,
    nullable: true,
  })
  unit?: Unit;

  @ApiProperty({
    description: 'Band the member is leading',
    type: () => Band,
    required: false,
  })
  @OneToOne(() => Band, { nullable: true })
  leadingBand?: Band;

  @ApiProperty({
    description: 'Leadership position held by the member',
    type: () => LeadershipPosition,
    required: false,
  })
  @ManyToOne(() => LeadershipPosition, { nullable: true })
  leadershipPosition?: LeadershipPosition | null;
}
