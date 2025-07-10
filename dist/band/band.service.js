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
exports.BandService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const band_entity_1 = require("../entity/band.entity");
const typeorm_2 = require("typeorm");
const member_entity_1 = require("../entity/member.entity");
let BandService = class BandService {
    bandRepository;
    memberRepository;
    constructor(bandRepository, memberRepository) {
        this.bandRepository = bandRepository;
        this.memberRepository = memberRepository;
    }
    async findAll() {
        return this.bandRepository
            .createQueryBuilder('band')
            .leftJoinAndSelect('band.members', 'members')
            .leftJoinAndSelect('members.unit', 'unit')
            .select(['band', 'members', 'unit.id', 'unit.name'])
            .getMany();
    }
    async findBandById(id) {
        return this.bandRepository
            .createQueryBuilder('band')
            .where('band.id = :id', { id })
            .leftJoinAndSelect('band.members', 'members')
            .leftJoinAndSelect('members.unit', 'unit')
            .select(['band', 'members', 'unit.id', 'unit.name'])
            .getOne();
    }
    async create(bandData) {
        const band = this.bandRepository.create(bandData);
        if (bandData.bandCaptainId) {
            const bandCaptain = await this.memberRepository.findOne({
                where: {
                    id: bandData.bandCaptainId,
                },
            });
            if (!bandCaptain)
                throw new common_1.NotFoundException(`Band with ID ${bandData.bandCaptainId} not found`);
            band.bandCaptain = bandCaptain;
        }
        return this.bandRepository.save(band);
    }
    async update(bandId, bandUpdateData) {
        let bandExists = await this.bandRepository.findOne({
            where: { id: bandId },
        });
        if (!bandExists) {
            throw new common_1.NotFoundException(`Band with ID ${bandId} not found`);
        }
        if (bandUpdateData.bandCaptainId) {
            const bandCaptain = await this.memberRepository.findOne({
                where: { id: bandUpdateData.bandCaptainId },
            });
            if (!bandCaptain)
                throw new common_1.NotFoundException(`Band with ID ${bandUpdateData.bandCaptainId} not found`);
            bandExists.bandCaptain = bandCaptain;
        }
        Object.keys(bandUpdateData).forEach((key) => {
            if (bandUpdateData[key] !== undefined && bandUpdateData[key] !== null) {
                bandExists[key] = bandUpdateData[key];
            }
        });
        return this.bandRepository.save(bandExists);
    }
};
exports.BandService = BandService;
exports.BandService = BandService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(band_entity_1.Band)),
    __param(1, (0, typeorm_1.InjectRepository)(member_entity_1.Member)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], BandService);
//# sourceMappingURL=band.service.js.map