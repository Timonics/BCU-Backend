"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const member_service_1 = require("./member.service");
const member_entity_1 = require("../entity/member.entity");
const member_controllers_1 = require("./member.controllers");
const band_module_1 = require("../band/band.module");
const unit_module_1 = require("../unit/unit.module");
const leadership_module_1 = require("../leadership/leadership.module");
let MemberModule = class MemberModule {
};
exports.MemberModule = MemberModule;
exports.MemberModule = MemberModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([member_entity_1.Member]), band_module_1.BandModule, unit_module_1.UnitModule, leadership_module_1.LeadershipModule],
        providers: [member_service_1.MemberService],
        controllers: [member_controllers_1.MemberController],
        exports: [member_service_1.MemberService],
    })
], MemberModule);
//# sourceMappingURL=member.module.js.map