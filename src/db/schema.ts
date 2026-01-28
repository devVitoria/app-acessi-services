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

export const spendingCategoriesTable = pgTable("spending_categories", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	userId: integer()
		.notNull()
		.references(() => usersTable.id, { onDelete: "cascade" }),
	name: text().notNull(),
	created_at: timestamp().defaultNow().notNull(),
});

export const financeChatTable = pgTable("finance_chat", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	userId: integer()
		.notNull()
		.references(() => usersTable.id, { onDelete: "cascade" }),
	reason: text().notNull(),
	value: integer().notNull(),
	category: integer().references(() => spendingCategoriesTable.id, {
		onDelete: "cascade",
	}),
	created_at: timestamp().defaultNow().notNull(),
	updated_at: timestamp().defaultNow().notNull(),
});
