"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const db_config_1 = require("./db/db.config");
const member_module_1 = require("./member/member.module");
const core_1 = require("@nestjs/core");
const auth_guard_1 = require("./auth/guard/auth.guard");
const auth_module_1 = require("./auth/auth.module");
const admin_module_1 = require("./admin/admin.module");
const band_module_1 = require("./band/band.module");
const unit_module_1 = require("./unit/unit.module");
const email_module_1 = require("./email/email.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(db_config_1.typeOrmConfig),
            admin_module_1.AdminModule,
            member_module_1.MemberModule,
            auth_module_1.AuthModule,
            band_module_1.BandModule,
            unit_module_1.UnitModule,
            email_module_1.EmailModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.JwtGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map