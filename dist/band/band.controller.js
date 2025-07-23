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
exports.BandController = void 0;
const common_1 = require("@nestjs/common");
const band_service_1 = require("./band.service");
const band_entity_1 = require("../entity/band.entity");
const update_band_dto_1 = require("./dto/update_band.dto");
const create_band_dto_1 = require("./dto/create_band.dto");
const swagger_1 = require("@nestjs/swagger");
let BandController = class BandController {
    bandService;
    constructor(bandService) {
        this.bandService = bandService;
    }
    async findAllBands(page = 1, limit = 10, sortBy = "id", sortOrder = "ASC") {
        const bandsData = await this.bandService.findAll(page, limit, sortBy, sortOrder);
        if (!bandsData.bands.length) {
            return "No bands found";
        }
        return bandsData;
    }
    async findBand(id) {
        const band = await this.bandService.findBandById(id);
        if (!band) {
            throw new common_1.NotFoundException(`Band with ID ${id} not found`);
        }
        return band;
    }
    async createBand(bandData) {
        return await this.bandService.create(bandData);
    }
    async updateBand(id, updateBandData) {
        return await this.bandService.update(id, updateBandData);
    }
};
exports.BandController = BandController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: "Get paginated list of bands with metadata",
        description: "Returns a paginated list of bands with filtering, sorting",
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
        description: "Field to sort by (id, name, gender)",
        example: "name",
    }),
    (0, swagger_1.ApiQuery)({
        name: "sortOrder",
        required: false,
        enum: ["ASC", "DESC"],
        description: "Sort order (ASC or DESC)",
        example: "ASC",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "Paginated list of bands with metadata",
        schema: {
            type: "object",
            properties: {
                data: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Band" },
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
                        totalBandLeaders: { type: "number", example: 40 },
                        hasPrev: { type: "boolean", example: "true" },
                        hasNext: { type: "boolean", example: "true" },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "No bands found",
        type: String,
    }),
    __param(0, (0, common_1.Query)("page")),
    __param(1, (0, common_1.Query)("limit")),
    __param(2, (0, common_1.Query)("sortBy")),
    __param(3, (0, common_1.Query)("sortOrder")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], BandController.prototype, "findAllBands", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({
        summary: "Get band by ID",
        description: "Retrieves a specific band by its ID",
    }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Band ID", type: Number }),
    (0, swagger_1.ApiOkResponse)({
        description: "Band retrieved successfully",
        type: band_entity_1.Band,
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: "Band not found" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BandController.prototype, "findBand", null);
__decorate([
    (0, common_1.Post)("add-band"),
    (0, swagger_1.ApiOperation)({
        summary: "Create a new band",
        description: "Creates a new band with the provided data",
    }),
    (0, swagger_1.ApiBody)({
        description: "Band creation data",
        type: create_band_dto_1.CreateBandDto,
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: "Band created successfully",
        type: band_entity_1.Band,
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "Invalid input data" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_band_dto_1.CreateBandDto]),
    __metadata("design:returntype", Promise)
], BandController.prototype, "createBand", null);
__decorate([
    (0, common_1.Put)("update-band/:id"),
    (0, swagger_1.ApiOperation)({
        summary: "Update a band",
        description: "Updates an existing band with partial or complete data",
    }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Band ID to update", type: Number }),
    (0, swagger_1.ApiBody)({
        description: "Band update data (partial allowed)",
        type: update_band_dto_1.UpdateBandDto,
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "Band updated successfully",
        type: band_entity_1.Band,
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: "Band not found" }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "Invalid input data" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], BandController.prototype, "updateBand", null);
exports.BandController = BandController = __decorate([
    (0, swagger_1.ApiTags)("Bands"),
    (0, swagger_1.ApiBearerAuth)("access-token"),
    (0, common_1.Controller)("bands"),
    __metadata("design:paramtypes", [band_service_1.BandService])
], BandController);
//# sourceMappingURL=band.controller.js.map