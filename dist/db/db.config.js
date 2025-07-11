"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.typeOrmConfig = {
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
//# sourceMappingURL=db.config.js.map