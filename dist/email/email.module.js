"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailModule = void 0;
const common_1 = require("@nestjs/common");
const email_service_1 = require("./email.service");
const jwt_1 = require("@nestjs/jwt");
const admin_module_1 = require("../admin/admin.module");
const config_1 = require("@nestjs/config");
const user_register_listener_1 = require("./listeners/user.register.listener");
let EmailModule = class EmailModule {
};
exports.EmailModule = EmailModule;
exports.EmailModule = EmailModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.registerAsync({
                useFactory: (configService) => ({
                    secret: configService.get("JWT_VERIFICATION_TOKEN_SECRET"),
                    signOptions: {
                        expiresIn: `${configService.get("JWT_VERIFICATION_TOKEN_EXPIRATION_TIME")}s`,
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            admin_module_1.AdminModule,
        ],
        providers: [email_service_1.EmailService, user_register_listener_1.UserRegisteredListener],
        exports: [email_service_1.EmailService],
    })
], EmailModule);
//# sourceMappingURL=email.module.js.map