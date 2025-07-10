"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseInterceptor = void 0;
const rxjs_1 = require("rxjs");
class ResponseInterceptor {
    intercept(_, next) {
        return next.handle().pipe((0, rxjs_1.map)((data) => ({
            statusCode: 200,
            message: 'success',
            data,
            timestamp: new Date().toISOString(),
        })));
    }
}
exports.ResponseInterceptor = ResponseInterceptor;
//# sourceMappingURL=reponse.interceptor.js.map