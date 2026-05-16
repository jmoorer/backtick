import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";

export const pastes = pgTable("pastes", {
  id: text("id").primaryKey(),
  short_id: text("short_id").notNull().unique(),
  content: text("content").notNull(),
  title: text("title"),
  is_public: integer("is_public").notNull().default(1), // boolean as int
  password_hash: text("password_hash"),
  delete_token: text("delete_token").notNull(),
  expires_at: timestamp("expires_at", { withTimezone: true }),
  view_count: integer("view_count").notNull().default(0),
  created_at: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
