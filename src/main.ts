import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { ErrorException } from "./common/exceptions/error.exceptions";
import { ResponseInterceptor } from "./common/interceptors/reponse.interceptor";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as express from "express";
import { ExpressAdapter } from "@nestjs/platform-express";
import { config } from "dotenv";

config();

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  const swaggerConfig = new DocumentBuilder()
    .setTitle("BCU Church Management API")
    .setDescription("API for managing church members, bands, and units")
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
  SwaggerModule.setup("api/v1/api-docs", app, document);

  app.setGlobalPrefix(process.env.API || "api/v1");

  app.enableShutdownHooks();

  await app.init();
  return server;
}

export default bootstrap().then((app) => {
  if (process.env.NODE_ENV === "development") {
    app.listen(process.env.PORT || 3000);
  }

  return app;
});
