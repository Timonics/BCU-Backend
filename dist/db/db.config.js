"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const isProduction = process.env.NODE_ENV === "production";
exports.typeOrmConfig = {
    type: "postgres",
    host: isProduction
        ? (process.env.DB_HOST ?? "aws-1-eu-north-1.pooler.supabase.com")
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
//# sourceMappingURL=db.config.js.map