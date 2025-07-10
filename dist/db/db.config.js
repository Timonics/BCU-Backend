"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.typeOrmConfig = {
    type: "postgres",
    url: process.env.DB_URL,
    ssl: { rejectUnauthorized: false },
    entities: [__dirname + "/../**/*.entity{.ts,.js}"],
    synchronize: process.env.NODE_ENV !== "production",
    autoLoadEntities: true,
    poolSize: 10,
    retryAttempts: 3,
    retryDelay: 3000,
};
//# sourceMappingURL=db.config.js.map