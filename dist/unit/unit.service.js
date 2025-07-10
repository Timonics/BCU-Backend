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
exports.UnitService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const unit_entity_1 = require("../entity/unit.entity");
const typeorm_2 = require("typeorm");
const member_entity_1 = require("../entity/member.entity");
let UnitService = class UnitService {
    unitRepository;
    memberRepository;
    constructor(unitRepository, memberRepository) {
        this.unitRepository = unitRepository;
        this.memberRepository = memberRepository;
    }
    async findAll() {
        return this.unitRepository
            .createQueryBuilder('unit')
            .leftJoinAndSelect('unit.unitHead', 'unitHead')
            .leftJoinAndSelect('unitHead.band', 'band')
            .select(['unit', 'unitHead', 'band.id', 'band.name'])
            .getMany();
    }
    async findUnitById(id) {
        return this.unitRepository
            .createQueryBuilder('unit')
            .where('unit.id = :id', { id })
            .leftJoinAndSelect('unit.unitHead', 'unitHead')
            .leftJoinAndSelect('unitHead.band', 'band')
            .select(['unit', 'unitHead', 'band.id', 'band.name'])
            .getOne();
    }
    async create(unitData) {
        const unit = this.unitRepository.create(unitData);
        if (unitData.unitHeadId) {
            const unitHead = await this.memberRepository.findOne({
                where: {
                    id: unitData.unitHeadId,
                },
            });
            if (!unitHead)
                throw new common_1.NotFoundException(`Unit with ID ${unitData.unitHeadId} not found`);
            unit.unitHead = unitHead;
        }
        return this.unitRepository.save(unit);
    }
    async update(unitId, unitUpdateData) {
        let unitExists = await this.unitRepository.findOne({
            where: { id: unitId },
        });
        if (!unitExists) {
            throw new common_1.NotFoundException(`Unit with ID ${unitId} not found`);
        }
        if (unitUpdateData.unitHeadId) {
            const unitCaptain = await this.memberRepository.findOne({
                where: { id: unitUpdateData.unitHeadId },
            });
            if (!unitCaptain)
                throw new common_1.NotFoundException(`Unit with ID ${unitUpdateData.unitHeadId} not found`);
            unitExists.unitHead = unitCaptain;
        }
        Object.keys(unitUpdateData).forEach((key) => {
            if (unitUpdateData[key] !== undefined && unitUpdateData[key] !== null) {
                unitExists[key] = unitUpdateData[key];
            }
        });
        return this.unitRepository.save(unitExists);
    }
};
exports.UnitService = UnitService;
exports.UnitService = UnitService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(unit_entity_1.Unit)),
    __param(1, (0, typeorm_1.InjectRepository)(member_entity_1.Member)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UnitService);
//# sourceMappingURL=unit.service.js.map