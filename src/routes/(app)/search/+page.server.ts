import { db } from '$lib/server/db.js';
import { toolTable, type PluginSource, type PluginType } from '$lib/schemas/tool.schema.js';
import { and, eq, like, type SQLWrapper } from 'drizzle-orm';
import pino from 'pino';
import { toolBinTable, type SelectToolBin } from '$lib/schemas/tool_bin.schema';

const getLimit = (url: URL) => {
	const limit = url.searchParams.get('limit');
	return limit ? parseInt(limit) : 10;
};

const getOffset = (url: URL) => {
	const offset = url.searchParams.get('offset');
	return offset ? parseInt(offset) : 0;
};

export const load = async ({ url }) => {
	if (url.searchParams.has('q')) {
		const conditions: SQLWrapper[] = [];

		const q = url.searchParams.get('q');
		conditions.push(like(toolTable.name, `%${q}%`));

		const source = url.searchParams.get('source');
		if (source) {
			conditions.push(eq(toolTable.source, source as PluginSource));
		}

		const type = url.searchParams.get('type');
		if (type) {
			conditions.push(eq(toolTable.type, type as PluginType));
		}

		const tools = await db
			.select()
			.from(toolTable)
			.leftJoin(toolBinTable, eq(toolTable.id, toolBinTable.tool_id))
			.where(and(...conditions))
			.offset(getOffset(url))
			.limit(getLimit(url));

		const mapped = tools.map((tool) => {
			const bins: SelectToolBin[] = [];

			tools
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

		pino().debug({ tools: mapped });

		return {
			tools: mapped
		};
	}

	return {
		tools: []
	};
};
