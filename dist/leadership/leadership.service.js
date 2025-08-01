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
exports.LeadershipService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const leadership_entity_1 = require("../entity/leadership.entity");
const typeorm_2 = require("typeorm");
const leadership_type_enum_1 = require("../utils/enums/leadership_type.enum");
let LeadershipService = class LeadershipService {
    leadershipRepository;
    constructor(leadershipRepository) {
        this.leadershipRepository = leadershipRepository;
    }
    async create(leadershipData) {
        const leader = this.leadershipRepository.create(leadershipData);
        return this.leadershipRepository.save(leader);
    }
    async findLeadershipPositionById(id) {
        return this.leadershipRepository.findOne({
            where: { id },
            relations: ["members"],
        });
    }
    async findAllLeaders() {
        return this.leadershipRepository
            .createQueryBuilder("leader")
            .leftJoinAndSelect("leader.members", "members")
            .leftJoin("members.band", "band")
            .leftJoin("members.unit", "unit")
            .loadRelationCountAndMap("leader.membersCount", "leader.members")
            .select(["leader", "band.id", "band.name", "unit.id", "unit.name"])
            .getMany();
    }
    async findCaptainPosition() {
        return this.leadershipRepository.findOne({
            where: {
                type: leadership_type_enum_1.LeadershipType.CAPTAIN,
            },
        });
    }
};
exports.LeadershipService = LeadershipService;
exports.LeadershipService = LeadershipService = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(leadership_entity_1.LeadershipPosition)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LeadershipService);
//# sourceMappingURL=leadership.service.js.map