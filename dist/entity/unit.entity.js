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
exports.Unit = void 0;
const typeorm_1 = require("typeorm");
const member_entity_1 = require("./member.entity");
const swagger_1 = require("@nestjs/swagger");
let Unit = class Unit {
    id;
    name;
    foundingDate;
    unitHead;
    members;
};
exports.Unit = Unit;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Auto-generated unique identifier',
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Unit.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of the unit',
        example: 'IT Unit',
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Unit.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date when the unit was founded (YYYY-MM-DD)',
        example: '1990-01-15',
    }),
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Unit.prototype, "foundingDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The member who heads this unit',
        type: () => member_entity_1.Member,
        required: false,
    }),
    (0, typeorm_1.OneToOne)(() => member_entity_1.Member, { nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], Unit.prototype, "unitHead", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of members belonging to this unit',
        type: () => [member_entity_1.Member],
        isArray: true,
    }),
    (0, typeorm_1.OneToMany)(() => member_entity_1.Member, (member) => member.unit),
    __metadata("design:type", Array)
], Unit.prototype, "members", void 0);
exports.Unit = Unit = __decorate([
    (0, typeorm_1.Entity)()
], Unit);
//# sourceMappingURL=unit.entity.js.map