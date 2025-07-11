import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { config } from "dotenv";

config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "postgres",
  url: process.env.DB_URL,
  host: process.env.DB_HOST || "aws-0-us-east-2.pooler.supabase.com",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "postgres",
  migrations: [__dirname + "/migrations/*{.ts,.js}"],
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  synchronize: process.env.NODE_ENV !== "production",
  autoLoadEntities: true,
  poolSize: 10,
  retryAttempts: 3,
  retryDelay: 3000,
};
