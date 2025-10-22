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
exports.EmailService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const admin_service_1 = require("../admin/admin.service");
const dotenv = require("dotenv");
dotenv.config();
let EmailService = class EmailService {
    jwtService;
    mailerService;
    adminService;
    constructor(jwtService, mailerService, adminService) {
        this.jwtService = jwtService;
        this.mailerService = mailerService;
        this.adminService = adminService;
    }
    sendVerificationLink(email) {
        const payload = { email };
        const token = this.jwtService.sign(payload, {
            secret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
            expiresIn: `${process.env.JWT_VERIFICATION_TOKEN_EXPIRATION_TIME}s`,
        });
        const url = `${process.env.EMAIL_CONFIRMATION_URL}?token=${token}`;
        return this.mailerService.sendMail({
            to: email,
            subject: "BCU Email Verification",
            template: "email-confirmation",
            context: {
                url,
                email,
            },
        });
    }
    async confirmEmail(email) {
        const userExists = await this.adminService.findAdminByEmail(email);
        if (userExists?.isVerified) {
            throw new common_1.BadRequestException("Email already confirmed");
        }
        await this.adminService.markEmailAsVerified(email);
    }
    async decodeConfirmationToken(token) {
        try {
            const payload = await this.jwtService.verify(token, {
                secret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
            });
            if (typeof payload === "object" && "email" in payload) {
                return payload.email;
            }
            throw new common_1.BadRequestException();
        }
        catch (error) {
            if (error?.name === "TokenExpiredError") {
                throw new common_1.BadRequestException("Email confirmation token expired");
            }
            throw new common_1.BadRequestException("Bad confirmation token");
        }
    }
    async resendConfirmationLink(email) {
        const admin = await this.adminService.findAdminByEmail(email);
        if (admin?.isVerified) {
            throw new common_1.BadRequestException("Email already confirmed");
        }
        await this.sendVerificationLink(admin.email);
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        mailer_1.MailerService,
        admin_service_1.AdminService])
], EmailService);
//# sourceMappingURL=email.service.js.map