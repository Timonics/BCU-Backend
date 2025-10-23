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
var EmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const admin_service_1 = require("../admin/admin.service");
const config_1 = require("@nestjs/config");
const resend_1 = require("resend");
const path = require("path");
const fs = require("fs-extra");
const handlebars = require("handlebars");
let EmailService = EmailService_1 = class EmailService {
    jwtService;
    adminService;
    configService;
    logger = new common_1.Logger(EmailService_1.name);
    resend;
    constructor(jwtService, adminService, configService) {
        this.jwtService = jwtService;
        this.adminService = adminService;
        this.configService = configService;
        this.resend = new resend_1.Resend(this.configService.get("RESEND_API_KEY"));
    }
    async compileTemplate(templateName, context) {
        const templatePath = path.join(__dirname, "templates", `${templateName}.hbs`);
        const templateContent = await fs.readFile(templatePath, "utf-8");
        const template = handlebars.compile(templateContent);
        return template(context);
    }
    async sendVerificationLink(email) {
        const payload = { email };
        const token = this.jwtService.sign(payload, {
            secret: this.configService.get("JWT_VERIFICATION_TOKEN_SECRET"),
            expiresIn: `${this.configService.get("JWT_VERIFICATION_TOKEN_EXPIRATION_TIME")}s`,
        });
        const url = `${this.configService.get("EMAIL_CONFIRMATION_URL")}?token=${token}`;
        const html = await this.compileTemplate("email-confirmation", {
            url,
            email,
        });
        const from = this.configService.get("RESEND_FROM_EMAIL") || "BCU <onboarding@resend.dev>";
        try {
            const data = await this.resend.emails.send({
                from,
                to: email,
                subject: "BCU Email Verification",
                html,
            });
            this.logger.log("Verification email sent");
            return data;
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.BadRequestException("Error sending verification email");
        }
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
                secret: this.configService.get("JWT_VERIFICATION_TOKEN_SECRET"),
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
        this.logger.log(`Resending email to ${admin.email}`);
        await this.sendVerificationLink(admin.email);
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        admin_service_1.AdminService,
        config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map