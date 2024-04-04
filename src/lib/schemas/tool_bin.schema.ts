import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { toolTable } from './tool.schema';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const toolBinTable = sqliteTable('tool_bins', {
	tool_id: text('tool_id')
		.notNull()
		.references(() => toolTable.id),
	bin: text('bin').notNull()
});

export const selectToolBinSchema = createSelectSchema(toolBinTable, {
	tool_id: z.string(),
	bin: z.string()
});
export type SelectToolBin = z.infer<typeof selectToolBinSchema>;

export const insertToolBinSchema = createInsertSchema(toolBinTable, {
	tool_id: z.string(),
	bin: z.string()
});
export type InsertToolBin = z.infer<typeof insertToolBinSchema>;
