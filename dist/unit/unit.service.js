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
const leadership_entity_1 = require("../entity/leadership.entity");
let UnitService = class UnitService {
    unitRepository;
    memberRepository;
    leadershipRepository;
    constructor(unitRepository, memberRepository, leadershipRepository) {
        this.unitRepository = unitRepository;
        this.memberRepository = memberRepository;
        this.leadershipRepository = leadershipRepository;
    }
    async findAll(page = 1, limit = 10, sortBy = "id", sortOrder = "ASC") {
        const queryBuilder = this.unitRepository
            .createQueryBuilder("unit")
            .leftJoinAndSelect("unit.unitHead", "unitHead")
            .leftJoinAndSelect("unitHead.band", "band")
            .leftJoinAndSelect("unit.members", "members")
            .select(["unit", "unitHead", "band.id", "band.name", "members"]);
        if (sortOrder) {
            const validSorts = ["id", "gender", "name"];
            if (validSorts.includes(sortBy)) {
                queryBuilder.orderBy(`band.${sortBy}`, sortOrder);
            }
        }
        const totalUnitLeaders = await this.unitRepository.count({
            where: {
                unitHead: (0, typeorm_2.Not)(null),
            },
        });
        const totalUnits = await this.unitRepository.count();
        const totalPages = Math.ceil(totalUnits / limit);
        const data = await queryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .getMany();
        return {
            units: data,
            meta: {
                totalPages,
                currentPage: page,
                limit,
                totalUnits,
                totalUnitLeaders,
                hasPrev: page < 1,
                hasNext: page < totalPages,
            },
        };
    }
    async findUnitById(id) {
        return this.unitRepository
            .createQueryBuilder("unit")
            .where("unit.id = :id", { id })
            .leftJoinAndSelect("unit.unitHead", "unitHead")
            .leftJoinAndSelect("unitHead.band", "band")
            .leftJoinAndSelect("unit.members", "members")
            .select(["unit", "unitHead", "band.id", "band.name", "members"])
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
                throw new common_1.NotFoundException(`Member with ID ${unitData.unitHeadId} not found`);
            unit.unitHead = unitHead;
        }
        return this.unitRepository.save(unit);
    }
    async update(unitId, unitUpdateData) {
        const unitExists = await this.unitRepository.findOne({
            where: { id: unitId },
        });
        if (!unitExists) {
            throw new common_1.NotFoundException(`Unit with ID ${unitId} not found`);
        }
        if (unitUpdateData.unitHeadId) {
            let memberExists = await this.memberRepository.findOne({
                where: { id: unitUpdateData.unitHeadId },
            });
            if (!memberExists)
                throw new common_1.NotFoundException(`Member with ID ${unitUpdateData.unitHeadId} not found`);
            if (memberExists.unit?.id !== unitId && memberExists.unit)
                throw new common_1.NotAcceptableException("This member already belongs to another unit");
            if (!memberExists.unit) {
                this.memberRepository.update(memberExists.id, { unit: unitExists });
            }
            unitExists.unitHead = memberExists;
        }
        Object.keys(unitUpdateData).forEach((key) => {
            if (unitUpdateData[key] !== undefined && unitUpdateData[key] !== null) {
                unitExists[key] = unitUpdateData[key];
            }
        });
        return this.unitRepository.save(unitExists);
    }
    async findUnitMembers(unitId) {
        const allUnitMembers = this.memberRepository.find({
            where: {
                unit: { id: unitId },
            },
        });
        if (!allUnitMembers) {
            throw new common_1.NotFoundException("No unit members found");
        }
        return allUnitMembers;
    }
};
exports.UnitService = UnitService;
exports.UnitService = UnitService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(unit_entity_1.Unit)),
    __param(1, (0, typeorm_1.InjectRepository)(member_entity_1.Member)),
    __param(2, (0, typeorm_1.InjectRepository)(leadership_entity_1.LeadershipPosition)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UnitService);
//# sourceMappingURL=unit.service.js.map