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
exports.Member = void 0;
const gender_enum_1 = require("../utils/enums/gender.enum");
const status_enum_1 = require("../utils/enums/status.enum");
const typeorm_1 = require("typeorm");
const band_entity_1 = require("./band.entity");
const unit_entity_1 = require("./unit.entity");
const swagger_1 = require("@nestjs/swagger");
const leadership_entity_1 = require("./leadership.entity");
const dateTransformer = {
    to: (value) => value,
    from: (value) => value,
};
let Member = class Member {
    id;
    firstName;
    lastName;
    otherNames;
    gender;
    email;
    phoneNumber;
    dateOfBirth;
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
    band;
    unit;
    leadingBand;
    leadershipPosition;
};
exports.Member = Member;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Auto-generated unique identifier',
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Member.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'First name of the member',
        example: 'John',
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Member.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Last name of the member',
        example: 'Doe',
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Member.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Other names of the member',
        example: 'Smith',
        required: false,
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Member.prototype, "otherNames", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Gender of the member',
        enum: gender_enum_1.Gender,
        example: gender_enum_1.Gender.MALE,
    }),
    (0, typeorm_1.Column)({ type: 'enum', enum: gender_enum_1.Gender }),
    __metadata("design:type", String)
], Member.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email address of the member',
        example: 'john.doe@example.com',
    }),
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Member.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Phone number of the member',
        example: '+1234567890',
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Member.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date of birth in YYYY-MM-DD format',
        example: '1990-01-15',
    }),
    (0, typeorm_1.Column)({
        type: 'date',
        transformer: dateTransformer,
    }),
    __metadata("design:type", String)
], Member.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Marital status of the member',
        example: 'Single',
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Member.prototype, "maritalStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'State of origin',
        example: 'Lagos',
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Member.prototype, "stateOfOrigin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Residential address',
        example: '123 Main Street',
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Member.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Country of residence',
        example: 'Nigeria',
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Member.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'State of residence',
        example: 'Lagos',
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Member.prototype, "residentialState", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'City of residence',
        example: 'Ikeja',
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Member.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Local Government Area',
        example: 'Ikeja LGA',
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Member.prototype, "localGovernmentArea", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Member status',
        enum: status_enum_1.MemberStatus,
        example: status_enum_1.MemberStatus.PENDING,
        default: status_enum_1.MemberStatus.PENDING,
    }),
    (0, typeorm_1.Column)({ type: 'enum', enum: status_enum_1.MemberStatus, default: status_enum_1.MemberStatus.PENDING }),
    __metadata("design:type", String)
], Member.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Full name of next of kin',
        example: 'Jane Doe',
        required: false,
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Member.prototype, "nextOfKinFullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Relationship with next of kin',
        example: 'Spouse',
        required: false,
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Member.prototype, "nextOfKinRelationship", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Phone number of next of kin',
        example: '+1234567891',
        required: false,
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Member.prototype, "nextOfKinPhoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Baptismal status',
        example: false,
        default: false,
    }),
    (0, typeorm_1.Column)({ type: 'bool', default: false }),
    __metadata("design:type", Boolean)
], Member.prototype, "baptismalStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Location where baptism took place',
        example: 'River Jordan Church',
        required: false,
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Member.prototype, "locationOfBaptism", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of educational institution attended',
        example: 'University of Lagos',
        required: false,
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Member.prototype, "institutionName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Highest qualification obtained',
        example: 'B.Sc Computer Science',
        required: false,
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Member.prototype, "qualification", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Course of study',
        example: 'Computer Science',
        required: false,
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Member.prototype, "courseOfStudy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Start date of education in YYYY-MM-DD format',
        example: '2010-09-01',
        required: false,
    }),
    (0, typeorm_1.Column)({ type: 'date', transformer: dateTransformer, nullable: true }),
    __metadata("design:type", String)
], Member.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'End date of education in YYYY-MM-DD format',
        example: '2014-07-15',
        required: false,
    }),
    (0, typeorm_1.Column)({ type: 'date', transformer: dateTransformer, nullable: true }),
    __metadata("design:type", String)
], Member.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Professional qualifications',
        example: 'CIPM, PMP',
        required: false,
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Member.prototype, "professionalQualifications", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vocational qualifications',
        example: 'Diploma in Catering',
        required: false,
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Member.prototype, "vocationalQualification", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Place of work',
        example: 'Tech Solutions Inc.',
        required: false,
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Member.prototype, "placeOfWork", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Office address',
        example: '456 Business Avenue',
        required: false,
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Member.prototype, "officeAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'State where work is located',
        example: 'Lagos',
        required: false,
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Member.prototype, "workState", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'LGA where work is located',
        example: 'Victoria Island LGA',
        required: false,
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Member.prototype, "workLGA", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Country where work is located',
        example: 'Nigeria',
        required: false,
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Member.prototype, "workCountry", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Band the member belongs to',
        type: () => band_entity_1.Band,
        required: false,
    }),
    (0, typeorm_1.ManyToOne)(() => band_entity_1.Band, (band) => band.members, {
        eager: true,
        nullable: true,
    }),
    __metadata("design:type", band_entity_1.Band)
], Member.prototype, "band", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unit the member belongs to',
        type: () => unit_entity_1.Unit,
        required: false,
    }),
    (0, typeorm_1.ManyToOne)(() => unit_entity_1.Unit, (unit) => unit.members, {
        eager: true,
        nullable: true,
    }),
    __metadata("design:type", unit_entity_1.Unit)
], Member.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Band the member is leading',
        type: () => band_entity_1.Band,
        required: false,
    }),
    (0, typeorm_1.OneToOne)(() => band_entity_1.Band, { nullable: true }),
    __metadata("design:type", band_entity_1.Band)
], Member.prototype, "leadingBand", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Leadership position held by the member',
        type: () => leadership_entity_1.LeadershipPosition,
        required: false,
    }),
    (0, typeorm_1.ManyToOne)(() => leadership_entity_1.LeadershipPosition, { nullable: true }),
    __metadata("design:type", Object)
], Member.prototype, "leadershipPosition", void 0);
exports.Member = Member = __decorate([
    (0, typeorm_1.Entity)()
], Member);
//# sourceMappingURL=member.entity.js.map