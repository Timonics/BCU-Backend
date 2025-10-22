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
exports.EmailController = void 0;
const common_1 = require("@nestjs/common");
const public_decorator_1 = require("../common/decorators/public.decorator");
const email_service_1 = require("./email.service");
const swagger_1 = require("@nestjs/swagger");
let EmailController = class EmailController {
    emailVerifyService;
    constructor(emailVerifyService) {
        this.emailVerifyService = emailVerifyService;
    }
    async confirm(token, res) {
        const email = await this.emailVerifyService.decodeConfirmationToken(token);
        await this.emailVerifyService.confirmEmail(email);
        res.redirect(`${process.env.FRONTEND_URL}/auth/email-verified`);
    }
    async resendConfirmationLink(email) {
        await this.emailVerifyService.resendConfirmationLink(email);
        return { message: "Verification email resent" };
    }
};
exports.EmailController = EmailController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)("confirm"),
    (0, swagger_1.ApiOperation)({ summary: "Confirm email address with verification token" }),
    (0, swagger_1.ApiQuery)({
        name: "token",
        required: true,
        description: "Verification token sent to user email",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Email successfully verified",
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Invalid or expired token",
    }),
    __param(0, (0, common_1.Query)("token")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "confirm", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)("resend"),
    (0, swagger_1.ApiOperation)({ summary: "Resend verification email" }),
    (0, swagger_1.ApiBody)({
        type: String,
        description: "Email address",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Verification email resent successfully",
        schema: {
            example: { message: "Verification email resent" },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Email not sent",
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "resendConfirmationLink", null);
exports.EmailController = EmailController = __decorate([
    (0, swagger_1.ApiTags)("Email Verification"),
    (0, common_1.Controller)("email-verification"),
    __metadata("design:paramtypes", [email_service_1.EmailService])
], EmailController);
//# sourceMappingURL=email.controller.js.map