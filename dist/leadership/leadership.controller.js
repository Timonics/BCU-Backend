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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadershpController = void 0;
const common_1 = require("@nestjs/common");
const leadership_service_1 = require("./leadership.service");
const create_leadership_dto_1 = require("./dto/create_leadership.dto");
const swagger_1 = require("@nestjs/swagger");
const leadership_entity_1 = require("../entity/leadership.entity");
let LeadershpController = class LeadershpController {
    leadersipService;
    constructor(leadersipService) {
        this.leadersipService = leadersipService;
    }
    async createLeadership(leadershipData) {
        return await this.leadersipService.create(leadershipData);
    }
};
exports.LeadershpController = LeadershpController;
__decorate([
    (0, common_1.Post)(''),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new leadership position',
        description: 'Creates a new leadership position in the system',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Leadership position successfully created',
        type: leadership_entity_1.LeadershipPosition,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - invalid data provided',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_leadership_dto_1.CreateLeadershipDto]),
    __metadata("design:returntype", Promise)
], LeadershpController.prototype, "createLeadership", null);
exports.LeadershpController = LeadershpController = __decorate([
    (0, swagger_1.ApiTags)('Leadership'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)("leadership"),
    __metadata("design:paramtypes", [leadership_service_1.LeadershipService])
], LeadershpController);
//# sourceMappingURL=leadership.controller.js.map