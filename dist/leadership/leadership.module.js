"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadershipModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const leadership_entity_1 = require("../entity/leadership.entity");
const leadership_service_1 = require("./leadership.service");
const leadership_controller_1 = require("./leadership.controller");
let LeadershipModule = class LeadershipModule {
};
exports.LeadershipModule = LeadershipModule;
exports.LeadershipModule = LeadershipModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([leadership_entity_1.LeadershipPosition])],
        controllers: [leadership_controller_1.LeadershpController],
        providers: [leadership_service_1.LeadershipService],
        exports: [leadership_service_1.LeadershipService],
    })
], LeadershipModule);
//# sourceMappingURL=leadership.module.js.map