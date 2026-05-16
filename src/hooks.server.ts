import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "$lib/server/db";
import { building } from "$app/environment";

if (!building) {
  console.log("running migration");
  await migrate(db, { migrationsFolder: "drizzle" });
  console.log("migration complete");
}
