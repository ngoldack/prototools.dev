import { toolTable } from '$lib/schemas/tool.schema';
import { toolBinTable, type SelectToolBin } from '$lib/schemas/tool_bin.schema';
import { db } from '$lib/server/db';
import { desc, eq, isNull } from 'drizzle-orm';

export const load = async () => {
	const newest = await db
		.select()
		.from(toolTable)
		.leftJoin(toolBinTable, eq(toolBinTable.tool_id, toolTable.id))
		.where(isNull(toolTable.deletedAt))
		.orderBy(desc(toolTable.createdAt))
		.limit(10);

	const mapped = newest.map((tool) => {
		const bins: SelectToolBin[] = [];

		newest
			.filter((t) => t.tools.id === tool.tools.id)
			.forEach((t) => {
				if (t.tool_bins) {
					bins.push(t.tool_bins);
				}
			});

		return {
			...tool.tools,
			bins
		};
	});

	return {
		newest: mapped
	};
};
