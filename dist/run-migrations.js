"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const data_source_1 = require("./data-source");
(async () => {
    try {
        const dataSource = new typeorm_1.DataSource(data_source_1.default.options);
        await dataSource.initialize();
        const migrations = await dataSource.runMigrations();
        console.log(`Ran ${migrations.length} migrations`);
        await dataSource.destroy();
        process.exit(0);
    }
    catch (error) {
        console.error("Migration error:", error);
        process.exit(1);
    }
})();
//# sourceMappingURL=run-migrations.js.map