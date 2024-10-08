// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  jsonb,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `myblog_${name}`);
export const createWeatherTable = pgTableCreator((name) => `myblog_${name}`);
export const createWeatherPreviousWeatherTable = pgTableCreator((name) => `myblog_${name}`);
export const createWeatherPrevious2MonthTable = pgTableCreator((name) => `myblog_${name}`);

export const posts = createTable(
  "post",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  })
);

export const weather = createWeatherTable(
  "weather",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).unique(),
    metadata: jsonb("metadata").default(sql`'{}'`),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (example) => ({
    nameIndex: index("weather_idx").on(example.name),
  })
);

export const weatherPreviousDay = createWeatherPreviousWeatherTable(
  "weatherpreviousday",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).unique(),
    metadata: jsonb("metadata").default(sql`'{}'`),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (example) => ({
    nameIndex: index("weatherpreviousday_idx").on(example.name),
  })
);

export const weatherPrevious2Months = createWeatherPrevious2MonthTable(
  "prevmonths",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).unique(),
    metadata: jsonb("metadata").default(sql`'{}'`),
  },
);
