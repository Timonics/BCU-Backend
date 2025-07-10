"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BandModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const band_entity_1 = require("../entity/band.entity");
const band_controller_1 = require("./band.controller");
const band_service_1 = require("./band.service");
const member_module_1 = require("../member/member.module");
const member_entity_1 = require("../entity/member.entity");
let BandModule = class BandModule {
};
exports.BandModule = BandModule;
exports.BandModule = BandModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([band_entity_1.Band, member_entity_1.Member]),
            (0, common_1.forwardRef)(() => member_module_1.MemberModule),
        ],
        controllers: [band_controller_1.BandController],
        providers: [band_service_1.BandService],
        exports: [band_service_1.BandService],
    })
], BandModule);
//# sourceMappingURL=band.module.js.map