"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const error_exceptions_1 = require("./common/exceptions/error.exceptions");
const reponse_interceptor_1 = require("./common/interceptors/reponse.interceptor");
const swagger_1 = require("@nestjs/swagger");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle("BCU Church Management API")
        .setDescription("API for managing church members, bands, and units")
        .setVersion("1.0")
        .addBearerAuth({
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: 'Enter JWT token in format: "Bearer {token}"',
    }, "access-token")
        .build();
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    app.useGlobalFilters(new error_exceptions_1.ErrorException());
    app.useGlobalInterceptors(new reponse_interceptor_1.ResponseInterceptor());
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup("api/v1/api-docs", app, document);
    app.setGlobalPrefix(process.env.API || "api/v1");
    app.enableShutdownHooks();
    app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map