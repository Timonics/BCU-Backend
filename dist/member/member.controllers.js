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
exports.MemberController = void 0;
const common_1 = require("@nestjs/common");
const member_service_1 = require("./member.service");
const member_entity_1 = require("../entity/member.entity");
const create_member_dto_1 = require("./dto/create_member.dto");
const update_member_dto_1 = require("./dto/update_member.dto");
const member_metadata_dto_1 = require("./dto/member_metadata.dto");
const swagger_1 = require("@nestjs/swagger");
let MemberController = class MemberController {
    memberService;
    constructor(memberService) {
        this.memberService = memberService;
    }
    async findAllMembers(page = 1, limit = 10, sortBy = "id", sortOrder = "ASC") {
        const membersData = await this.memberService.findAll(page, limit, sortBy, sortOrder);
        if (membersData?.members.length === 0) {
            return "No members found";
        }
        return membersData;
    }
    async findMember(id) {
        const member = await this.memberService.findOneById(id);
        if (!member) {
            throw new common_1.NotFoundException(`Member with ID ${id} not found`);
        }
        return member;
    }
    async getMembersStats() {
        const metadata = await this.memberService.memberMetaData();
        return metadata;
    }
    async createMember(memberData) {
        return await this.memberService.create(memberData);
    }
    async updateMember(id, memberUpdateData) {
        return await this.memberService.update(id, memberUpdateData);
    }
    async deleteMember(id) {
        await this.memberService.delete(id);
        return { message: `Member ${id} deleted successfully` };
    }
};
exports.MemberController = MemberController;
__decorate([
    (0, common_1.Get)(""),
    (0, swagger_1.ApiOperation)({
        summary: "Get paginated list of members with metadata",
        description: "Returns a paginated list of members with filtering, sorting, and metadata capabilities",
    }),
    (0, swagger_1.ApiQuery)({
        name: "page",
        required: false,
        type: Number,
        description: "Page number (default: 1)",
        example: 1,
    }),
    (0, swagger_1.ApiQuery)({
        name: "limit",
        required: false,
        type: Number,
        description: "Number of items per page (default: 10)",
        example: 10,
    }),
    (0, swagger_1.ApiQuery)({
        name: "sortBy",
        required: false,
        type: String,
        description: "Field to sort by (id, firstName, lastName, email, gender)",
        example: "lastName",
    }),
    (0, swagger_1.ApiQuery)({
        name: "sortOrder",
        required: false,
        enum: ["ASC", "DESC"],
        description: "Sort order (ASC or DESC)",
        example: "ASC",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "Paginated list of members with metadata",
        schema: {
            type: "object",
            properties: {
                data: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Member" },
                },
                meta: {
                    type: "object",
                    properties: {
                        totalPages: { type: "number", example: 100 },
                        currentPage: { type: "number", example: 1 },
                        limit: { type: "number", example: 10 },
                        totalMembers: { type: "number", example: 100 },
                        totalMaleMembers: { type: "number", example: 60 },
                        totalFemaleMembers: { type: "number", example: 40 },
                        hasPrev: { type: "boolean", example: "true" },
                        hasNext: { type: "boolean", example: "true" },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "No members found",
        schema: {
            type: "string",
            example: "No members found",
        },
    }),
    __param(0, (0, common_1.Query)("page")),
    __param(1, (0, common_1.Query)("limit")),
    __param(2, (0, common_1.Query)("sortBy")),
    __param(3, (0, common_1.Query)("sortOrder")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "findAllMembers", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Get a member by ID" }),
    (0, swagger_1.ApiParam)({
        name: "id",
        description: "ID of the member to retrieve",
        type: Number,
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "The found member record",
        type: member_entity_1.Member,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: "Member not found",
    }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "findMember", null);
__decorate([
    (0, common_1.Get)("stats"),
    (0, swagger_1.ApiOperation)({ summary: "Get members statistics" }),
    (0, swagger_1.ApiOkResponse)({
        description: "Members statistics data",
        type: member_metadata_dto_1.MemberMetaData,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "getMembersStats", null);
__decorate([
    (0, common_1.Post)("add-member"),
    (0, swagger_1.ApiOperation)({ summary: "Create a new member" }),
    (0, swagger_1.ApiBody)({
        type: create_member_dto_1.CreateMemberDto,
        description: "Member data to create",
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: "Member successfully created",
        type: member_entity_1.Member,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Bad request",
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_member_dto_1.CreateMemberDto]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "createMember", null);
__decorate([
    (0, common_1.Put)("update-member/:id"),
    (0, swagger_1.ApiOperation)({ summary: "Update a member" }),
    (0, swagger_1.ApiParam)({
        name: "id",
        description: "ID of the member to update",
        type: Number,
    }),
    (0, swagger_1.ApiBody)({
        type: update_member_dto_1.UpdateMemberDto,
        description: "Member data to update",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "Member successfully updated",
        type: member_entity_1.Member,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: "Member not found",
    }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "updateMember", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Delete a member" }),
    (0, swagger_1.ApiParam)({
        name: "id",
        description: "ID of the member to delete",
        type: Number,
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "Member successfully deleted",
        schema: {
            type: "object",
            properties: {
                message: {
                    type: "string",
                    example: "Member 1 deleted successfully",
                },
            },
        },
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: "Member not found",
    }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "deleteMember", null);
exports.MemberController = MemberController = __decorate([
    (0, swagger_1.ApiTags)("Members"),
    (0, swagger_1.ApiBearerAuth)("access-token"),
    (0, common_1.Controller)("members"),
    __metadata("design:paramtypes", [member_service_1.MemberService])
], MemberController);
//# sourceMappingURL=member.controllers.js.map