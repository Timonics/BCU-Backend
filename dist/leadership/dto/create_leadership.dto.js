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
exports.CreateLeadershipDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const leadership_type_enum_1 = require("../../utils/enums/leadership_type.enum");
class CreateLeadershipDto {
    type;
}
exports.CreateLeadershipDto = CreateLeadershipDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: leadership_type_enum_1.LeadershipType,
        description: 'Type of leadership position',
        default: leadership_type_enum_1.LeadershipType.CAPTAIN,
    }),
    (0, class_transformer_1.Transform)(({ value }) => value.toLowerCase()),
    (0, class_validator_1.IsEnum)(leadership_type_enum_1.LeadershipType, { message: 'Position can not be empty' }),
    __metadata("design:type", String)
], CreateLeadershipDto.prototype, "type", void 0);
//# sourceMappingURL=create_leadership.dto.js.map