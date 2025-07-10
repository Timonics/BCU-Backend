import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { config } from "dotenv";

config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "postgres",
  url: process.env.DB_URL,
  ssl: { rejectUnauthorized: false },
  // host: process.env.DB_HOST || "localhost",
  // port: parseInt(process.env.DB_PORT || "5432", 10),
  // username: process.env.DB_USERNAME,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME,
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  synchronize: process.env.NODE_ENV !== "production",
  autoLoadEntities: true,
  poolSize: 10,
  retryAttempts: 3,
  retryDelay: 3000,
};
