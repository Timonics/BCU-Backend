import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { config } from "dotenv";

config();

const isProduction = process.env.NODE_ENV === "production";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "postgres",
  url: isProduction ? process.env.DB_URL : "",
  host: isProduction
    ? (process.env.DB_HOST ?? "aws-0-us-east-2.pooler.supabase.com")
    : "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "postgres",
  password: isProduction ? process.env.DB_PASSWORD : "Oladotun1",
  database: isProduction ? (process.env.DB_NAME ?? "postgres") : "BCU",
  migrations: [__dirname + "/migrations/*{.ts,.js}"],
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  synchronize: process.env.NODE_ENV !== "production",
  autoLoadEntities: true,
  poolSize: 10,
  retryAttempts: 3,
  retryDelay: 3000,
};
