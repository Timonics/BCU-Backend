"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorException = void 0;
const common_1 = require("@nestjs/common");
let ErrorException = class ErrorException {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
            const response = exception.getResponse();
            message = typeof response === 'string' ? response : { ...response };
        }
        else if (exception instanceof Error) {
            message = exception.message;
        }
        else if (typeof exception === 'object' && exception !== null) {
            message = exception.toString();
        }
        response.status(status).json({
            statusCode: status,
            message,
            path: request.path,
            timestamp: new Date().toISOString(),
        });
    }
};
exports.ErrorException = ErrorException;
exports.ErrorException = ErrorException = __decorate([
    (0, common_1.Catch)()
], ErrorException);
//# sourceMappingURL=error.exceptions.js.map