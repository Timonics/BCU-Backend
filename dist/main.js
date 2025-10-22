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
        .setDescription(`${process.env.NODE_ENV === "production"
        ? "Production Server"
        : "Development Server"} APIs for C&S Youth Fellowship Band Coordinating Unit`)
        .setVersion("1.0")
        .addBearerAuth({
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: 'Enter JWT token in format: "Bearer {token}"',
    }, "access-token")
        .build();
    app.enableCors({
        origin: ["http://localhost:5173", "https://bcu-gules.vercel.app"],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        credentials: true,
    });
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
    swagger_1.SwaggerModule.setup("api-docs", app, document);
    app.enableShutdownHooks();
    app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map