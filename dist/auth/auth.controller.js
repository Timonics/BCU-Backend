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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const public_decorator_1 = require("../common/decorators/public.decorator");
const auth_service_1 = require("./auth.service");
const login_dto_1 = require("./dto/login.dto");
const register_dto_1 = require("./dto/register.dto");
const swagger_1 = require("@nestjs/swagger");
const email_service_1 = require("../email/email.service");
let AuthController = class AuthController {
    authService;
    emailVerifyService;
    constructor(authService, emailVerifyService) {
        this.authService = authService;
        this.emailVerifyService = emailVerifyService;
    }
    async login(loginData) {
        const userExists = await this.authService.findByEmail(loginData.email);
        if (!userExists) {
            throw new common_1.BadRequestException("This email does not exist");
        }
        const loggedUser = await this.authService.validateUser(loginData.email, loginData.password);
        if (!loggedUser) {
            throw new common_1.UnauthorizedException("Invalid credentials");
        }
        const token = await this.authService.login({
            email: loggedUser.email,
        });
        const { password, ...userDetails } = userExists;
        return {
            ...userDetails,
            ...token,
        };
    }
    async register(signupData) {
        return this.authService.register(signupData);
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
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)("login"),
    (0, swagger_1.ApiOperation)({
        summary: "Admin login",
        description: "Authenticates admin and returns JWT token",
    }),
    (0, swagger_1.ApiBody)({
        type: login_dto_1.LoginAdminDto,
        description: "Admin credentials",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Login successful",
        schema: {
            type: "object",
            properties: {
                access_token: {
                    type: "string",
                    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                },
            },
        },
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: "Invalid credentials",
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: "Validation error",
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginAdminDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("register"),
    (0, swagger_1.ApiOperation)({
        summary: "Admin registration",
        description: "Creates a new admin account (restricted to super admins)",
    }),
    (0, swagger_1.ApiBody)({
        type: register_dto_1.CreateAdminDto,
        description: "New admin details",
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: "Admin created successfully",
        type: register_dto_1.CreateAdminDto,
    }),
    (0, swagger_1.ApiConflictResponse)({
        description: "Email already exists",
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: "Validation error",
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: "Unauthorized (requires admin privileges)",
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.CreateAdminDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Get)("verify"),
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
], AuthController.prototype, "confirm", null);
__decorate([
    (0, common_1.Get)("resend"),
    (0, swagger_1.ApiOperation)({ summary: "Resend verification email" }),
    (0, swagger_1.ApiQuery)({
        name: "email",
        required: true,
        description: "Email to resend verification link",
        example: "olubiyioderinde7@gmail.com",
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
    __param(0, (0, common_1.Query)("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resendConfirmationLink", null);
exports.AuthController = AuthController = __decorate([
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiTags)("Authentication"),
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        email_service_1.EmailService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map