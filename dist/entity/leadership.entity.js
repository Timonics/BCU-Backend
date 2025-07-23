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
exports.LeadershipPosition = void 0;
const leadership_type_enum_1 = require("../utils/enums/leadership_type.enum");
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const member_entity_1 = require("./member.entity");
let LeadershipPosition = class LeadershipPosition {
    id;
    type;
    members;
    appointedAt;
};
exports.LeadershipPosition = LeadershipPosition;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: "Auto-generated unique identifier",
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], LeadershipPosition.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: leadership_type_enum_1.LeadershipType,
        example: leadership_type_enum_1.LeadershipType.CAPTAIN,
        description: "Leadership type",
    }),
    (0, typeorm_1.Column)({ type: "enum", enum: leadership_type_enum_1.LeadershipType, unique: true }),
    __metadata("design:type", String)
], LeadershipPosition.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "List of members having this leadership position",
        type: () => [member_entity_1.Member],
        isArray: true,
    }),
    (0, typeorm_1.OneToMany)(() => member_entity_1.Member, (member) => member.leadershipPosition),
    __metadata("design:type", Array)
], LeadershipPosition.prototype, "members", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "1995-07-21",
        description: "Date when the position was established",
        type: "string",
        format: "date",
    }),
    (0, typeorm_1.Column)({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        nullable: true,
    }),
    __metadata("design:type", Date)
], LeadershipPosition.prototype, "appointedAt", void 0);
exports.LeadershipPosition = LeadershipPosition = __decorate([
    (0, typeorm_1.Entity)()
], LeadershipPosition);
//# sourceMappingURL=leadership.entity.js.map