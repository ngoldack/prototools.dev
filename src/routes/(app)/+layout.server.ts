import { toolTable } from '$lib/schemas/tool.schema.js';
import { db } from '$lib/server/db.js';
import { count, isNull } from 'drizzle-orm';

export let load = async ({parent}) => {
    await parent();
    const [total] = await db.select({ count: count() }).from(toolTable).where(isNull(toolTable.deletedAt))

    return {
        total: total.count
    }
};