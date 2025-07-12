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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_1 = require("bcrypt");
const admin_service_1 = require("../admin/admin.service");
const email_service_1 = require("../email/email.service");
let AuthService = class AuthService {
    jwtService;
    adminService;
    emailVerifyService;
    constructor(jwtService, adminService, emailVerifyService) {
        this.jwtService = jwtService;
        this.adminService = adminService;
        this.emailVerifyService = emailVerifyService;
    }
    async validateUser(email, password) {
        const validatedAdmin = await this.adminService.findAdminByEmail(email);
        if (!validatedAdmin)
            return undefined;
        const isPasswordValid = (0, bcrypt_1.compareSync)(password, validatedAdmin.password);
        if (!validatedAdmin.isVerified) {
            throw new common_1.UnauthorizedException("Please verify your email first");
        }
        if (validatedAdmin && isPasswordValid) {
            const { password, ...result } = validatedAdmin;
            return result;
        }
    }
    async findByEmail(email) {
        return this.adminService.findAdminByEmail(email);
    }
    async login(payload) {
        return { access_token: this.jwtService.sign(payload) };
    }
    async register(adminData) {
        const adminExists = await this.adminService.findAdminByEmail(adminData.email);
        if (adminExists) {
            throw new Error("User already exists");
        }
        const newAdmin = await this.adminService.createAdmin({
            ...adminData,
            password: (0, bcrypt_1.hashSync)(adminData.password, 10),
        });
        await this.emailVerifyService.sendVerificationLink(newAdmin.email);
        const { password, ...result } = newAdmin;
        return {
            ...result,
            message: "Registration successful. Please check your email for verification.",
            access_token: this.jwtService.sign({ email: newAdmin.email }),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        admin_service_1.AdminService,
        email_service_1.EmailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map