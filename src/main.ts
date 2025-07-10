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

async function createNestApp(expressApp: express.Express) {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp)
  );

  const config = new DocumentBuilder()
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

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api-docs", app, document);

  app.setGlobalPrefix(process.env.API || "api/v1");

  app.enableShutdownHooks();

  process.on("SIGTERM", async () => {
    await app.close();
    process.exit(0);
  });

  await app.init();
  return expressApp;
}

const expressApp = express();
const nestAppPromise = createNestApp(expressApp);

if (process.env.NODE_ENV === "development") {
  nestAppPromise.then((app) => app.listen(process.env.PORT ?? 3000));
}

export default nestAppPromise;
