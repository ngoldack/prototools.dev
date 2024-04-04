import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export type PluginType = 'wasm' | 'toml';
export const pluginTypes = ['wasm', 'toml'] as const;
export type PluginSource = 'third-party' | 'built-in' | 'custom';
export const pluginSources = ['built-in', 'third-party', 'custom'] as const;

export const toolTable = sqliteTable('tools', {
	id: text('id')
		.notNull()
		.primaryKey()
		.$default(() => nanoid()),

	type: text('type', { enum: pluginTypes }).notNull(),
	source: text('source', { enum: pluginSources }).notNull(),
	homepage: text('homepage'),

	usageId: text('usage_id'),
	locator: text('locator'),

	name: text('name').notNull(),
	repository: text('repository').notNull(),
	description: text('description').notNull(),
	author: text('author').notNull(),

	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.$default(() => new Date(Date.now())),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
		.notNull()
		.$default(() => new Date(Date.now())),
	deletedAt: integer('deleted_at', { mode: 'timestamp' })
});

export const selectToolSchema = createSelectSchema(toolTable, {
	source: z.enum(pluginSources),
	type: z.enum(pluginTypes),

	repository: z.string().url()
});
export type SelectTool = z.infer<typeof selectToolSchema>;

export const insertToolSchema = createInsertSchema(toolTable, {
	source: z.enum(pluginSources),
	type: z.enum(pluginTypes),

	repository: z.string().url()
});
export type InsertTool = z.infer<typeof insertToolSchema>;
