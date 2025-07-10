import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Gender } from 'src/utils/enums/gender.enum';
import { MemberStatus } from 'src/utils/enums/status.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMemberDto {
  @ApiProperty({
    description: "Member's first name",
    example: 'John',
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    description: "Member's last name",
    example: 'Doe',
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiPropertyOptional({
    description: "Member's other names",
    example: 'Smith',
  })
  @IsOptional()
  @IsString()
  otherNames: string;

  @ApiProperty({
    description: "Member's gender (converted to lowercase)",
    enum: Gender,
    example: 'male',
  })
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.toLowerCase())
  @IsEnum(Gender, { message: 'Gender must either be male or female' })
  gender: Gender;

  @ApiProperty({
    description: "Member's email address",
    example: 'john.doe@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Member's phone number",
    example: '+2348012345678',
  })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    description: "Member's date of birth in ISO8601 format",
    example: '1990-01-15',
  })
  @IsNotEmpty({ message: 'Date of birth cannot be empty' })
  @IsISO8601({ strict: true, strictSeparator: true })
  dateOfBirth: string;

  @ApiProperty({
    description: "Member's marital status",
    example: 'Single',
  })
  @IsNotEmpty()
  @IsString()
  maritalStatus: string;

  @ApiProperty({
    description: "Member's state of origin",
    example: 'Lagos',
  })
  @IsNotEmpty()
  @IsString()
  stateOfOrigin: string;

  @ApiProperty({
    description: "Member's residential address",
    example: '123 Main Street',
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    description: "Member's country of residence",
    example: 'Nigeria',
  })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({
    description: "Member's state of residence",
    example: 'Lagos',
  })
  @IsNotEmpty()
  @IsString()
  residentialState: string;

  @ApiProperty({
    description: "Member's city of residence",
    example: 'Ikeja',
  })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({
    description: "Member's local government area",
    example: 'Alimosho',
  })
  @IsNotEmpty()
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
    description: 'ID of the band captain',
    example: 3,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  bandCaptainId?: number;

  @ApiPropertyOptional({
    description: 'ID of the leadership position',
    example: 4,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  leadershipPositionId?: number;
}
