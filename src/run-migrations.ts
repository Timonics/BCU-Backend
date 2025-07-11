import { DataSource } from "typeorm";
import source from "./data-source";

(async () => {
  try {
    const dataSource = new DataSource(source.options);
    await dataSource.initialize();

    const migrations = await dataSource.runMigrations();
    console.log(`Ran ${migrations.length} migrations`);

    await dataSource.destroy();
    process.exit(0);
  } catch (error) {
    console.error("Migration error:", error);
    process.exit(1);
  }
})();
