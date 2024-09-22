import * as fs from "fs";
import { Database } from "bun:sqlite";

const migrationsDir = "sql/";

function checkMigrationExecuted(filename: string) {
  try {
    const query = db.query(`select name from migrations where name = $1;`);
    const result = query.get(filename);
    return result !== null;
  } catch (e) {
    return false;
  }
}

function migrate(db: Database) {
  const entries = fs.readdirSync(migrationsDir).toSorted();
  for (const filename of entries) {
    if (!checkMigrationExecuted(filename)) {
      console.log("executing " + filename);
      const content = fs.readFileSync(migrationsDir + filename).toString();
      db.query(content).run();
      db.query(`insert into migrations (name)
                values ($1);`)
        .run(filename);
    }
  }
}

const db = new Database("test.db");
migrate(db);
