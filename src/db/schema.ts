import {
	integer,
	pgTable,
	varchar,
	boolean,
	timestamp,
	text,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull().unique(),
	cpf: varchar({ length: 11 }).notNull().unique(),
	emailCode: integer(),
	created_at: timestamp().defaultNow().notNull(),
	password: varchar({ length: 6 }).notNull(),
	validated: boolean().notNull().default(false),
});

export const tokensTable = pgTable("tokens", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	userId: integer()
		.notNull()
		.unique()
		.references(() => usersTable.id, { onDelete: "cascade" }),
	token: text().notNull(),
});
