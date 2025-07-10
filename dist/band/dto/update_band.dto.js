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
exports.UpdateBandDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const gender_enum_1 = require("../../utils/enums/gender.enum");
const swagger_1 = require("@nestjs/swagger");
class UpdateBandDto {
    name;
    gender;
    foundingDate;
    bandCaptainId;
}
exports.UpdateBandDto = UpdateBandDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Name of the band',
        example: 'Worship Team Alpha',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBandDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Gender composition of the band (converted to lowercase)',
        enum: gender_enum_1.Gender,
        example: 'male',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value.toLowerCase()),
    (0, class_validator_1.IsEnum)(gender_enum_1.Gender, { message: 'Gender must either be male or female' }),
    __metadata("design:type", String)
], UpdateBandDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Founding date of the band in ISO8601 format (YYYY-MM-DD)',
        example: '2018-05-20',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsISO8601)({ strict: true, strictSeparator: true }),
    __metadata("design:type", String)
], UpdateBandDto.prototype, "foundingDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID of the band captain',
        example: 42,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateBandDto.prototype, "bandCaptainId", void 0);
//# sourceMappingURL=update_band.dto.js.map