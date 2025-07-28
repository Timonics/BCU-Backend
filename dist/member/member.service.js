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
var MemberService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const member_entity_1 = require("../entity/member.entity");
const typeorm_2 = require("typeorm");
const band_service_1 = require("../band/band.service");
const unit_service_1 = require("../unit/unit.service");
const gender_enum_1 = require("../utils/enums/gender.enum");
const leadership_service_1 = require("../leadership/leadership.service");
const unit_entity_1 = require("../entity/unit.entity");
let MemberService = MemberService_1 = class MemberService {
    memberRepository;
    bandservice;
    unitRepository;
    unitservice;
    leadershipService;
    logger = new common_1.Logger(MemberService_1.name);
    constructor(memberRepository, bandservice, unitRepository, unitservice, leadershipService) {
        this.memberRepository = memberRepository;
        this.bandservice = bandservice;
        this.unitRepository = unitRepository;
        this.unitservice = unitservice;
        this.leadershipService = leadershipService;
    }
    async findAll(page = 1, limit = 10, sortBy = "1d", sortOrder = "ASC") {
        const queryBuilder = this.memberRepository
            .createQueryBuilder("member")
            .leftJoinAndSelect("member.band", "band")
            .leftJoin("band.bandCaptain", "bandCaptain")
            .leftJoinAndSelect("member.unit", "unit")
            .leftJoinAndSelect("member.leadershipPosition", "leadershipPosition")
            .select([
            "member",
            "band.id",
            "band.name",
            "bandCaptain.id",
            "bandCaptain.firstName",
            "bandCaptain.lastName",
            "bandCaptain.otherNames",
            "unit.id",
            "unit.name",
            "leadershipPosition",
        ]);
        if (sortBy) {
            const validSorts = [
                "id",
                "firstName",
                "lastName",
                "email",
                "gender",
                "status",
            ];
            if (validSorts.includes(sortBy)) {
                queryBuilder.orderBy(`member.${sortBy}`, sortOrder);
            }
            else if (sortBy == "band") {
                queryBuilder.orderBy(`band.name`, sortOrder);
            }
            else if (sortBy == "unit") {
                queryBuilder.orderBy(`unit.name`, sortOrder);
            }
            const data = await queryBuilder
                .skip((page - 1) * limit)
                .take(limit)
                .getMany();
            const totalPages = Math.ceil((await queryBuilder.getCount()) / limit);
            const membersMetaData = await this.memberMetaData();
            return {
                members: data,
                meta: {
                    ...membersMetaData,
                    totalPages,
                    currentPage: page,
                    limit,
                    hasPrev: page > 1,
                    hasNext: page < totalPages,
                },
            };
        }
    }
    async findOneById(id) {
        return this.memberRepository
            .createQueryBuilder("member")
            .where("member.id = :id", { id })
            .leftJoinAndSelect("member.band", "band")
            .leftJoinAndSelect("member.unit", "unit")
            .getOne();
    }
    async findOneByEmail(email) {
        return this.memberRepository.findOne({ where: { email } });
    }
    async create(memberData) {
        let member = this.memberRepository.create(memberData);
        if (memberData.bandId) {
            const band = await this.bandservice.findBandById(memberData.bandId);
            if (!band)
                throw new common_1.NotFoundException(`Band with ID ${memberData.bandId} not found`);
            member.band = band;
        }
        if (memberData.unitId) {
            const unit = await this.unitservice.findUnitById(memberData.unitId);
            if (!unit) {
                throw new common_1.NotFoundException(`Unit with ID ${memberData.unitId} not found`);
            }
            member.unit = unit;
        }
        if (memberData.leadershipPositionId) {
            const leader = await this.leadershipService.findLeadershipPositionById(memberData.leadershipPositionId);
            if (!leader) {
                throw new common_1.NotFoundException(`Leadership Position with ID ${memberData.leadershipPositionId} not found`);
            }
            member.leadershipPosition = leader;
        }
        return this.memberRepository.save(member);
    }
    async update(id, memberUpdateData) {
        const memberExists = await this.memberRepository.findOne({
            where: { id },
            relations: ["band", "band.members", "leadershipPosition", "unit", "unit.unitHead"],
        });
        if (!memberExists) {
            throw new common_1.NotFoundException(`Member with ID ${id} not found`);
        }
        if (memberUpdateData.bandId) {
            const band = await this.bandservice.findBandById(memberUpdateData.bandId);
            if (!band)
                throw new common_1.NotFoundException(`Band with ID ${memberUpdateData.bandId} not found`);
            if (memberExists.band && memberExists.band.bandCaptain) {
                memberExists.band.bandCaptain = null;
            }
            memberExists.band = band;
        }
        if (memberUpdateData.leadershipPositionId) {
            if (!memberExists.band && !memberExists.unit) {
                throw new common_1.NotAcceptableException("This member has to have belong to a band or unit before assigning leadership position");
            }
            const leaderPosition = await this.leadershipService.findLeadershipPositionById(memberUpdateData.leadershipPositionId);
            if (!leaderPosition) {
                throw new common_1.NotFoundException(`Leadership Position with ID ${memberUpdateData.leadershipPositionId} not found`);
            }
            const existingLeader = await this.memberRepository.findOne({
                where: {
                    band: { id: memberExists.band?.id },
                    leadershipPosition: { id: memberUpdateData.leadershipPositionId },
                    id: (0, typeorm_2.Not)(id),
                },
            });
            if (existingLeader) {
                throw new common_1.NotAcceptableException("This leadership position is already assigned to another member in the band");
            }
            if (leaderPosition.type === "captain") {
                await this.bandservice.update(memberExists.band?.id, {
                    bandCaptainId: memberExists.id,
                });
            }
            memberExists.leadershipPosition = leaderPosition;
        }
        let unitToUpdate = null;
        if (memberUpdateData.unitId) {
            const unit = await this.unitservice.findUnitById(memberUpdateData.unitId);
            if (!unit)
                throw new common_1.NotFoundException(`Unit with ID ${memberUpdateData.unitId} not found`);
            if (memberExists.unit &&
                memberExists.unit.id !== unit.id &&
                memberExists.unit.unitHead?.id === memberExists.id) {
                unitToUpdate = memberExists.unit;
                unitToUpdate.unitHead = null;
            }
            memberExists.unit = unit;
        }
        Object.assign(memberExists, memberUpdateData);
        return this.memberRepository.manager.transaction(async (transactionalEntityManager) => {
            if (unitToUpdate) {
                await transactionalEntityManager.save(unit_entity_1.Unit, unitToUpdate);
            }
            return await transactionalEntityManager.save(member_entity_1.Member, memberExists);
        });
    }
    async delete(memberId) {
        const result = await this.memberRepository.delete(memberId);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Member with ID ${memberId} not found`);
        }
    }
    async totalMembers() {
        try {
            return this.memberRepository.count();
        }
        catch (err) {
            this.logger.error("Failed to count members", err.stack);
            return 0;
        }
    }
    async totalMale() {
        try {
            return this.memberRepository.count({
                where: { gender: gender_enum_1.Gender.MALE },
            });
        }
        catch (err) {
            this.logger.error("Failed to count members", err.stack);
            return 0;
        }
    }
    async totalFemale() {
        try {
            return this.memberRepository.count({
                where: { gender: gender_enum_1.Gender.FEMALE },
            });
        }
        catch (err) {
            this.logger.error("Failed to count members", err.stack);
            return 0;
        }
    }
    async findMemberByName(name) {
        const nameArr = name.split(" ");
        const firstName = nameArr[0];
        const lastName = nameArr.at(-1);
        return this.memberRepository.findOne({
            where: {
                firstName,
                lastName,
            },
        });
    }
    async memberMetaData() {
        const [totalMembers, totalMaleMembers, totalFemaleMembers] = await Promise.all([
            this.totalMembers(),
            this.totalMale(),
            this.totalFemale(),
        ]);
        return {
            totalMembers,
            totalMaleMembers,
            totalFemaleMembers,
        };
    }
};
exports.MemberService = MemberService;
exports.MemberService = MemberService = MemberService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(member_entity_1.Member)),
    __param(2, (0, typeorm_1.InjectRepository)(unit_entity_1.Unit)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        band_service_1.BandService,
        typeorm_2.Repository,
        unit_service_1.UnitService,
        leadership_service_1.LeadershipService])
], MemberService);
//# sourceMappingURL=member.service.js.map