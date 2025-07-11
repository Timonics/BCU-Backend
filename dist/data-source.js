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
exports.default = new typeorm_1.DataSource({
    type: "postgres",
    url: process.env.DB_URL,
    host: process.env.DB_HOST || "aws-0-us-east-2.pooler.supabase.com",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || "postgres",
    migrations: [__dirname + "/migrations/*{.js,.ts}"],
    entities: [admin_entity_1.Admin, member_entity_1.Member, band_entity_1.Band, unit_entity_1.Unit, leadership_entity_1.LeadershipPosition],
    synchronize: process.env.NODE_ENV !== "production",
    ssl: { rejectUnauthorized: false },
});
//# sourceMappingURL=data-source.js.map