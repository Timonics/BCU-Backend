"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMemberDto = void 0;
const class_validator_1 = require("class-validator");
const gender_enum_1 = require("../../utils/enums/gender.enum");
const status_enum_1 = require("../../utils/enums/status.enum");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class UpdateMemberDto {
    firstName;
    lastName;
    otherNames;
    gender;
    email;
    phoneNumber;
    maritalStatus;
    stateOfOrigin;
    address;
    country;
    residentialState;
    city;
    localGovernmentArea;
    status;
    nextOfKinFullName;
    nextOfKinRelationship;
    nextOfKinPhoneNumber;
    baptismalStatus;
    locationOfBaptism;
    institutionName;
    qualification;
    courseOfStudy;
    startDate;
    endDate;
    professionalQualifications;
    vocationalQualification;
    placeOfWork;
    officeAddress;
    workState;
    workLGA;
    workCountry;
    bandId;
    unitId;
    leadershipPositionId;
}
exports.UpdateMemberDto = UpdateMemberDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Member's first name",
        example: 'John',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMemberDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Member's last name",
        example: 'Doe',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMemberDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Member's other names",
        example: 'Smith',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMemberDto.prototype, "otherNames", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Member's gender (converted to lowercase)",
        enum: gender_enum_1.Gender,
        example: 'male',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value.toLowerCase()),
    (0, class_validator_1.IsEnum)(gender_enum_1.Gender, { message: 'Gender must either be male or female' }),
    __metadata("design:type", String)
], UpdateMemberDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Member's email address",
        example: 'john.doe@example.com',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UpdateMemberDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Member's phone number",
        example: '+2348012345678',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMemberDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Member's marital status",
        example: 'Single',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMemberDto.prototype, "maritalStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Member's state of origin",
        example: 'Lagos',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMemberDto.prototype, "stateOfOrigin", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Member's residential address",
        example: '123 Main Street',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMemberDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Member's country of residence",
        example: 'Nigeria',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMemberDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Member's state of residence",
        example: 'Lagos',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMemberDto.prototype, "residentialState", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Member's city of residence",
        example: 'Ikeja',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMemberDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Member's local government area",
        example: 'Alimosho',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMemberDto.prototype, "localGovernmentArea", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Member's status (converted to lowercase)",
        enum: status_enum_1.MemberStatus,
        example: 'active',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value.toLowerCase()),
    (0, class_validator_1.IsEnum)(status_enum_1.MemberStatus),
    __metadata("design:type", String)
], UpdateMemberDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Next of kin's full name",
        example: 'Jane Doe',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMemberDto.prototype, "nextOfKinFullName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Relationship with next of kin',
        example: 'Sister',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMemberDto.prototype, "nextOfKinRelationship", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Next of kin's phone number",
        example: '+2348098765432',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMemberDto.prototype, "nextOfKinPhoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Whether member is baptized',
        example: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateMemberDto.prototype, "baptismalStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Location where member was baptized',
        example: 'River Jordan Church',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMemberDto.prototype, "locationOfBaptism", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Educational institution name',
        example: 'University of Lagos',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMemberDto.prototype, "institutionName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Educational qualification',
        example: 'B.Sc',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMemberDto.prototype, "qualification", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Course of study',
        example: 'Computer Science',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMemberDto.prototype, "courseOfStudy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Education start date in ISO8601 format',
        example: '2010-09-01',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsISO8601)({ strict: true, strictSeparator: true }),
    __metadata("design:type", String)
], UpdateMemberDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Education end date in ISO8601 format',
        example: '2014-07-31',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsISO8601)({ strict: true, strictSeparator: true }),
    __metadata("design:type", String)
], UpdateMemberDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Professional qualifications',
        example: 'CIPM, PMP',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMemberDto.prototype, "professionalQualifications", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Vocational qualifications',
        example: 'Catering',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMemberDto.prototype, "vocationalQualification", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Place of work',
        example: 'Tech Solutions Inc.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMemberDto.prototype, "placeOfWork", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Office address',
        example: '456 Business Avenue',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMemberDto.prototype, "officeAddress", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'State where member works',
        example: 'Lagos',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMemberDto.prototype, "workState", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'LGA where member works',
        example: 'Ikeja',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMemberDto.prototype, "workLGA", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Country where member works',
        example: 'Nigeria',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMemberDto.prototype, "workCountry", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID of the band member belongs to',
        example: 1,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateMemberDto.prototype, "bandId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID of the unit member belongs to',
        example: 2,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateMemberDto.prototype, "unitId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID of the leadership position',
        example: 4,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateMemberDto.prototype, "leadershipPositionId", void 0);
//# sourceMappingURL=update_member.dto.js.map