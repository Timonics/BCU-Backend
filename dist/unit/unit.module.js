"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const unit_entity_1 = require("../entity/unit.entity");
const unit_service_1 = require("./unit.service");
const unit_controller_1 = require("./unit.controller");
const member_entity_1 = require("../entity/member.entity");
const member_module_1 = require("../member/member.module");
const leadership_module_1 = require("../leadership/leadership.module");
const leadership_entity_1 = require("../entity/leadership.entity");
let UnitModule = class UnitModule {
};
exports.UnitModule = UnitModule;
exports.UnitModule = UnitModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([unit_entity_1.Unit, member_entity_1.Member, leadership_entity_1.LeadershipPosition]),
            (0, common_1.forwardRef)(() => member_module_1.MemberModule),
            leadership_module_1.LeadershipModule,
        ],
        controllers: [unit_controller_1.UnitController],
        providers: [unit_service_1.UnitService],
        exports: [unit_service_1.UnitService],
    })
], UnitModule);
//# sourceMappingURL=unit.module.js.map