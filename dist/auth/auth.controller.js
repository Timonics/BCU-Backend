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
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async login(loginData) {
        const loggedUser = await this.authService.validateUser(loginData.email, loginData.password);
        if (!loggedUser) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        return this.authService.login({
            id: loggedUser.id,
            email: loggedUser.email,
        });
    }
    async register(signupData) {
        return this.authService.register(signupData);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({
        summary: 'Admin login',
        description: 'Authenticates admin and returns JWT token',
    }),
    (0, swagger_1.ApiBody)({
        type: login_dto_1.LoginAdminDto,
        description: 'Admin credentials',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Login successful',
        schema: {
            type: 'object',
            properties: {
                access_token: {
                    type: 'string',
                    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                },
            },
        },
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Invalid credentials',
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Validation error',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginAdminDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({
        summary: 'Admin registration',
        description: 'Creates a new admin account (restricted to super admins)',
    }),
    (0, swagger_1.ApiBody)({
        type: register_dto_1.CreateAdminDto,
        description: 'New admin details',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Admin created successfully',
        type: register_dto_1.CreateAdminDto,
    }),
    (0, swagger_1.ApiConflictResponse)({
        description: 'Email already exists',
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Validation error',
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Unauthorized (requires admin privileges)',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.CreateAdminDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
exports.AuthController = AuthController = __decorate([
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiTags)('Authentication'),
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map