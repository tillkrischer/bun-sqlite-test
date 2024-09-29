import * as fs from "fs";
import { Database } from "bun:sqlite";

async function migrate(db: Database, migrationsDir: string) {
  const entries = fs.readdirSync(migrationsDir).toSorted();
  for (const filename of entries) {
    console.log("running " + filename);
    try {
      const content = await Bun.file(migrationsDir + filename).text();
      const transaction = db.transaction(() => {
        content
          .split(";")
          .filter((sql) => sql.trim().length > 0)
          .forEach((sql) => {
            db.run(sql);
          });
      });
      transaction();
    } catch (e) {
      console.error("error: " + e.message);
    }
  }
}

const db = new Database("test.db", { strict: true });
migrate(db, "sql/");
