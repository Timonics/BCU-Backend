import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { config } from "dotenv";
import { Admin } from "src/entity/admin.entity";
import { Band } from "src/entity/band.entity";
import { LeadershipPosition } from "src/entity/leadership.entity";
import { Member } from "src/entity/member.entity";
import { Unit } from "src/entity/unit.entity";

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
  entities: [Admin, Band, Member, Unit, LeadershipPosition],
  synchronize: process.env.NODE_ENV !== "production",
  autoLoadEntities: true,
  poolSize: 10,
  retryAttempts: 3,
  retryDelay: 3000,
};
