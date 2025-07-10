"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_local_1 = require("passport-local");
const common_1 = require("@nestjs/common");
class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    authService;
    constructor(authService) {
        super({
            usernameField: 'email',
        });
        this.authService = authService;
    }
    async validate(email, passowrd) {
        const validateUser = this.authService.validateUser(email, passowrd);
        if (!validateUser) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        return validateUser;
    }
}
exports.LocalStrategy = LocalStrategy;
//# sourceMappingURL=local.strategy.js.map