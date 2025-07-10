import {
  IsOptional,
  IsString,
  IsEnum,
  IsEmail,
  IsISO8601,
  IsBoolean,
  IsNumber,
} from 'class-validator';
import { Gender } from 'src/utils/enums/gender.enum';
import { MemberStatus } from 'src/utils/enums/status.enum';
import { CreateMemberDto } from './create_member.dto';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

type ImmutableFields = 'dateOfBirth';
type UpdateMemberFields = Omit<CreateMemberDto, ImmutableFields>;

export class UpdateMemberDto implements UpdateMemberFields {
  @ApiPropertyOptional({
    description: "Member's first name",
    example: 'John',
  })
  @IsOptional()
  @IsString()
  firstName: string;

  @ApiPropertyOptional({
    description: "Member's last name",
    example: 'Doe',
  })
  @IsOptional()
  @IsString()
  lastName: string;

  @ApiPropertyOptional({
    description: "Member's other names",
    example: 'Smith',
  })
  @IsOptional()
  @IsString()
  otherNames: string;

  @ApiPropertyOptional({
    description: "Member's gender (converted to lowercase)",
    enum: Gender,
    example: 'male',
  })
  @IsOptional()
  @Transform(({ value }: { value: string }) => value.toLowerCase())
  @IsEnum(Gender, { message: 'Gender must either be male or female' })
  gender: Gender;

  @ApiPropertyOptional({
    description: "Member's email address",
    example: 'john.doe@example.com',
  })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    description: "Member's phone number",
    example: '+2348012345678',
  })
  @IsOptional()
  @IsString()
  phoneNumber: string;

  @ApiPropertyOptional({
    description: "Member's marital status",
    example: 'Single',
  })
  @IsOptional()
  @IsString()
  maritalStatus: string;

  @ApiPropertyOptional({
    description: "Member's state of origin",
    example: 'Lagos',
  })
  @IsOptional()
  @IsString()
  stateOfOrigin: string;

  @ApiPropertyOptional({
    description: "Member's residential address",
    example: '123 Main Street',
  })
  @IsOptional()
  @IsString()
  address: string;

  @ApiPropertyOptional({
    description: "Member's country of residence",
    example: 'Nigeria',
  })
  @IsOptional()
  @IsString()
  country: string;

  @ApiPropertyOptional({
    description: "Member's state of residence",
    example: 'Lagos',
  })
  @IsOptional()
  @IsString()
  residentialState: string;

  @ApiPropertyOptional({
    description: "Member's city of residence",
    example: 'Ikeja',
  })
  @IsOptional()
  @IsString()
  city: string;

  @ApiPropertyOptional({
    description: "Member's local government area",
    example: 'Alimosho',
  })
  @IsOptional()
  @IsString()
  localGovernmentArea: string;

  @ApiPropertyOptional({
    description: "Member's status (converted to lowercase)",
    enum: MemberStatus,
    example: 'active',
  })
  @IsOptional()
  @Transform(({ value }: { value: string }) => value.toLowerCase())
  @IsEnum(MemberStatus)
  status: MemberStatus;

  @ApiPropertyOptional({
    description: "Next of kin's full name",
    example: 'Jane Doe',
  })
  @IsOptional()
  @IsString()
  nextOfKinFullName?: string;

  @ApiPropertyOptional({
    description: 'Relationship with next of kin',
    example: 'Sister',
  })
  @IsOptional()
  @IsString()
  nextOfKinRelationship?: string;

  @ApiPropertyOptional({
    description: "Next of kin's phone number",
    example: '+2348098765432',
  })
  @IsOptional()
  @IsString()
  nextOfKinPhoneNumber?: string;

  @ApiPropertyOptional({
    description: 'Whether member is baptized',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  baptismalStatus?: boolean;

  @ApiPropertyOptional({
    description: 'Location where member was baptized',
    example: 'River Jordan Church',
  })
  @IsOptional()
  @IsString()
  locationOfBaptism?: string;

  @ApiPropertyOptional({
    description: 'Educational institution name',
    example: 'University of Lagos',
  })
  @IsOptional()
  @IsString()
  institutionName?: string;

  @ApiPropertyOptional({
    description: 'Educational qualification',
    example: 'B.Sc',
  })
  @IsOptional()
  @IsString()
  qualification?: string;

  @ApiPropertyOptional({
    description: 'Course of study',
    example: 'Computer Science',
  })
  @IsOptional()
  @IsString()
  courseOfStudy?: string;

  @ApiPropertyOptional({
    description: 'Education start date in ISO8601 format',
    example: '2010-09-01',
  })
  @IsOptional()
  @IsISO8601({ strict: true, strictSeparator: true })
  startDate?: string;

  @ApiPropertyOptional({
    description: 'Education end date in ISO8601 format',
    example: '2014-07-31',
  })
  @IsOptional()
  @IsISO8601({ strict: true, strictSeparator: true })
  endDate?: string;

  @ApiPropertyOptional({
    description: 'Professional qualifications',
    example: 'CIPM, PMP',
  })
  @IsOptional()
  @IsString()
  professionalQualifications?: string;

  @ApiPropertyOptional({
    description: 'Vocational qualifications',
    example: 'Catering',
  })
  @IsOptional()
  @IsString()
  vocationalQualification?: string;

  @ApiPropertyOptional({
    description: 'Place of work',
    example: 'Tech Solutions Inc.',
  })
  @IsOptional()
  @IsString()
  placeOfWork?: string;

  @ApiPropertyOptional({
    description: 'Office address',
    example: '456 Business Avenue',
  })
  @IsOptional()
  @IsString()
  officeAddress?: string;

  @ApiPropertyOptional({
    description: 'State where member works',
    example: 'Lagos',
  })
  @IsOptional()
  @IsString()
  workState?: string;

  @ApiPropertyOptional({
    description: 'LGA where member works',
    example: 'Ikeja',
  })
  @IsOptional()
  @IsString()
  workLGA?: string;

  @ApiPropertyOptional({
    description: 'Country where member works',
    example: 'Nigeria',
  })
  @IsOptional()
  @IsString()
  workCountry?: string;

  @ApiPropertyOptional({
    description: 'ID of the band member belongs to',
    example: 1,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  bandId?: number;

  @ApiPropertyOptional({
    description: 'ID of the unit member belongs to',
    example: 2,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  unitId?: number;

  @ApiPropertyOptional({
    description: 'ID of the leadership position',
    example: 4,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  leadershipPositionId?: number;
}
