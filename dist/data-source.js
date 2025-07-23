"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const admin_entity_1 = require("./entity/admin.entity");
const member_entity_1 = require("./entity/member.entity");
const band_entity_1 = require("./entity/band.entity");
const unit_entity_1 = require("./entity/unit.entity");
const leadership_entity_1 = require("./entity/leadership.entity");
const dotenv = require("dotenv");
dotenv.config();
const isProduction = process.env.NODE_ENV === "production";
const source = new typeorm_1.DataSource({
    type: "postgres",
    url: isProduction ? process.env.DB_URL : "",
    host: isProduction
        ? (process.env.DB_HOST ?? "aws-0-us-east-2.pooler.supabase.com")
        : "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME || "postgres",
    password: isProduction ? process.env.DB_PASSWORD : "Oladotun1",
    database: isProduction ? (process.env.DB_NAME ?? "postgres") : "BCU",
    migrations: isProduction
        ? [__dirname + "/../dist/migrations/*.js"]
        : [__dirname + "/migrations/*{.js,.ts}"],
    entities: isProduction
        ? [__dirname + "/../dist/entity/*.entity.js"]
        : [admin_entity_1.Admin, member_entity_1.Member, band_entity_1.Band, unit_entity_1.Unit, leadership_entity_1.LeadershipPosition],
    synchronize: process.env.NODE_ENV !== "production",
    ssl: isProduction ? { rejectUnauthorized: false } : undefined,
});
exports.default = source;
//# sourceMappingURL=data-source.js.map