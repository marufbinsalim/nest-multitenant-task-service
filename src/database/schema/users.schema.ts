import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { refreshTokens } from './refresh-tokens.schema';
import { organizations } from './organizations.schema';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull(),
  password: text('password').notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  refreshTokens: many(refreshTokens),
  organizations: many(organizations),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
