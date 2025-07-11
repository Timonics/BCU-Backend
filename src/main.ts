import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { ErrorException } from "./common/exceptions/error.exceptions";
import { ResponseInterceptor } from "./common/interceptors/reponse.interceptor";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { config } from "dotenv";

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle("BCU Church Management API")
    .setDescription("APIs for C&S Youth Fellowship members management")
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: 'Enter JWT token in format: "Bearer {token}"',
      },
      "access-token"
    )
    .build();

  app.enableCors({
    origin: [
      "http://localhost:5173/",
      "https://bcu-gules.vercel.app/",
      "https://bcu-backend-ckde.onrender.com/",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  app.useGlobalFilters(new ErrorException());
  app.useGlobalInterceptors(new ResponseInterceptor());

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api-docs", app, document);

  app.enableShutdownHooks();

  app.listen(process.env.PORT || 3000);
}

bootstrap();
