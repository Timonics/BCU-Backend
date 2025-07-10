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
exports.CreateBandDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const gender_enum_1 = require("../../utils/enums/gender.enum");
class CreateBandDto {
    name;
    gender;
    foundingDate;
    bandCaptainId;
}
exports.CreateBandDto = CreateBandDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of the band',
        example: 'Praise Team',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBandDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Gender composition of the band (converted to lowercase)',
        enum: gender_enum_1.Gender,
        example: 'male',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => value.toLowerCase()),
    (0, class_validator_1.IsEnum)(gender_enum_1.Gender, { message: 'Gender must either be male or female' }),
    __metadata("design:type", String)
], CreateBandDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Founding date of the band in ISO8601 format',
        example: '2020-01-15',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Founding date cannot be empty' }),
    (0, class_validator_1.IsISO8601)({ strict: true, strictSeparator: true }),
    __metadata("design:type", String)
], CreateBandDto.prototype, "foundingDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID of the band captain',
        example: 42,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateBandDto.prototype, "bandCaptainId", void 0);
//# sourceMappingURL=create_band.dto.js.map