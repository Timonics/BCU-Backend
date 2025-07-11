import { DataSource } from "typeorm";
import { Admin } from "./entity/admin.entity";
import { Member } from "./entity/member.entity";
import { Band } from "./entity/band.entity";
import { Unit } from "./entity/unit.entity";
import { LeadershipPosition } from "./entity/leadership.entity";
import * as dotenv from 'dotenv';

dotenv.config();

export default new DataSource({
  type: "postgres",
  url: process.env.DB_URL,
  host: process.env.DB_HOST || "aws-0-us-east-2.pooler.supabase.com",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "postgres",
  migrations: [__dirname + "/migrations/*{.js,.ts}"],
  entities: [Admin, Member, Band, Unit, LeadershipPosition],
  synchronize: process.env.NODE_ENV !== "production",
  ssl: { rejectUnauthorized: false },
});
