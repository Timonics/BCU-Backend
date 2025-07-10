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
    async findAllBands() {
        const bands = await this.bandService.findAll();
        if (!bands.length) {
            return 'No bands found';
        }
        return bands;
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
        summary: 'Get all bands',
        description: 'Retrieves a list of all bands. Returns empty message if no bands exist.',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'List of bands retrieved successfully',
        type: band_entity_1.Band,
        isArray: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'No bands found',
        type: String,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BandController.prototype, "findAllBands", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get band by ID',
        description: 'Retrieves a specific band by its ID',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Band ID', type: Number }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Band retrieved successfully',
        type: band_entity_1.Band,
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Band not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BandController.prototype, "findBand", null);
__decorate([
    (0, common_1.Post)('add-band'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new band',
        description: 'Creates a new band with the provided data',
    }),
    (0, swagger_1.ApiBody)({
        description: 'Band creation data',
        type: create_band_dto_1.CreateBandDto,
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Band created successfully',
        type: band_entity_1.Band,
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid input data' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_band_dto_1.CreateBandDto]),
    __metadata("design:returntype", Promise)
], BandController.prototype, "createBand", null);
__decorate([
    (0, common_1.Put)('update-band/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update a band',
        description: 'Updates an existing band with partial or complete data',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Band ID to update', type: Number }),
    (0, swagger_1.ApiBody)({
        description: 'Band update data (partial allowed)',
        type: update_band_dto_1.UpdateBandDto,
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Band updated successfully',
        type: band_entity_1.Band,
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Band not found' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid input data' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], BandController.prototype, "updateBand", null);
exports.BandController = BandController = __decorate([
    (0, swagger_1.ApiTags)('Bands'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)("bands"),
    __metadata("design:paramtypes", [band_service_1.BandService])
], BandController);
//# sourceMappingURL=band.controller.js.map