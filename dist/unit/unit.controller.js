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
exports.UnitController = void 0;
const common_1 = require("@nestjs/common");
const unit_service_1 = require("./unit.service");
const unit_entity_1 = require("../entity/unit.entity");
const update_unit_dto_1 = require("./dto/update_unit.dto");
const create_unit_dto_1 = require("./dto/create_unit.dto");
const swagger_1 = require("@nestjs/swagger");
let UnitController = class UnitController {
    unitService;
    constructor(unitService) {
        this.unitService = unitService;
    }
    async findAllUnits() {
        const units = await this.unitService.findAll();
        if (!units.length) {
            return 'No units found';
        }
        return units;
    }
    async findUnit(id) {
        const unit = await this.unitService.findUnitById(id);
        if (!unit) {
            throw new common_1.NotFoundException(`Unit with ID ${id} not found`);
        }
        return unit;
    }
    async createUnit(unitData) {
        return await this.unitService.create(unitData);
    }
    async updateUnit(id, updateUnitData) {
        return await this.unitService.update(id, updateUnitData);
    }
};
exports.UnitController = UnitController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all units',
        description: 'Retrieves a list of all units. Returns message if no units exist.',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'List of units retrieved successfully',
        type: unit_entity_1.Unit,
        isArray: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'No units found',
        type: String,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UnitController.prototype, "findAllUnits", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get unit by ID',
        description: 'Retrieves a specific unit by its ID',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Unit ID',
        type: Number,
        example: 1,
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Unit retrieved successfully',
        type: unit_entity_1.Unit,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Unit not found',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UnitController.prototype, "findUnit", null);
__decorate([
    (0, common_1.Post)('add-unit'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new unit',
        description: 'Creates a new unit with the provided data',
    }),
    (0, swagger_1.ApiBody)({
        description: 'Unit creation data',
        type: create_unit_dto_1.CreateUnitDto,
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Unit created successfully',
        type: unit_entity_1.Unit,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Invalid input data',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_unit_dto_1.CreateUnitDto]),
    __metadata("design:returntype", Promise)
], UnitController.prototype, "createUnit", null);
__decorate([
    (0, common_1.Put)('update-unit/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update a unit',
        description: 'Updates an existing unit with partial or complete data',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Unit ID to update',
        type: Number,
        example: 1,
    }),
    (0, swagger_1.ApiBody)({
        description: 'Unit update data (partial updates allowed)',
        type: update_unit_dto_1.UpdateUnitDto,
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Unit updated successfully',
        type: unit_entity_1.Unit,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Unit not found',
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Invalid input data',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UnitController.prototype, "updateUnit", null);
exports.UnitController = UnitController = __decorate([
    (0, swagger_1.ApiTags)('Units'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)("units"),
    __metadata("design:paramtypes", [unit_service_1.UnitService])
], UnitController);
//# sourceMappingURL=unit.controller.js.map