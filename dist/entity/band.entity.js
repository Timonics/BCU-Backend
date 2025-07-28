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
exports.Band = void 0;
const gender_enum_1 = require("../utils/enums/gender.enum");
const typeorm_1 = require("typeorm");
const member_entity_1 = require("./member.entity");
const swagger_1 = require("@nestjs/swagger");
let Band = class Band {
    id;
    name;
    gender;
    foundingDate;
    members;
    bandCaptain;
};
exports.Band = Band;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Auto-generated unique identifier',
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Band.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Joseph Band', description: 'Name of band' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Band.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: gender_enum_1.Gender,
        example: gender_enum_1.Gender.MALE,
        description: 'Gender classification of the band',
    }),
    (0, typeorm_1.Column)({ type: 'enum', enum: gender_enum_1.Gender }),
    __metadata("design:type", String)
], Band.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date when the band was established in YYYY-MM-DD format',
        example: '1990-01-15',
    }),
    (0, typeorm_1.Column)({
        type: 'date',
        transformer: {
            to: (value) => value,
            from: (value) => value,
        },
    }),
    __metadata("design:type", Date)
], Band.prototype, "foundingDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => [member_entity_1.Member],
        isArray: true,
        description: 'Array of members belonging to this band',
        required: false,
    }),
    (0, typeorm_1.OneToMany)(() => member_entity_1.Member, (member) => member.band),
    __metadata("design:type", Array)
], Band.prototype, "members", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => member_entity_1.Member,
        description: 'The captain/leader of this band',
        required: false,
    }),
    (0, typeorm_1.OneToOne)(() => member_entity_1.Member, { nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], Band.prototype, "bandCaptain", void 0);
exports.Band = Band = __decorate([
    (0, typeorm_1.Entity)()
], Band);
//# sourceMappingURL=band.entity.js.map