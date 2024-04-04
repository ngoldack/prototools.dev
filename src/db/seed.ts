import { toolTable, type InsertTool } from '$lib/schemas/tool.schema';
import { toolBinTable, type InsertToolBin } from '$lib/schemas/tool_bin.schema';
import { faker } from '@faker-js/faker';
import { createClient } from '@libsql/client/web';
import { drizzle } from 'drizzle-orm/libsql';

const client = createClient({
	url: process.env.DATABASE_URL!,
	authToken: process.env.DATABASE_AUTH_TOKEN
});
export const db = drizzle(client, {
	logger: true
});

const seed = async () => {
	const tools: InsertTool[] = [];
	const toolBins: InsertToolBin[] = [];

	for (let i = 0; i < 1_000; i++) {
		const name = faker.git.branch().toLowerCase();
		const username = faker.internet.userName();
		tools.push({
			name,
			description: faker.commerce.productDescription(),
			author: username,
			repository: `${faker.internet.url()}/${username}/${name}`,
			source: faker.helpers.arrayElement(toolTable.source.enumValues),
			type: faker.helpers.arrayElement(toolTable.type.enumValues),
			homepage: faker.internet.url(),

			usageId: name
		} as InsertTool);
	}

	const t = await db
		.insert(toolTable)
		.values(tools)
		.returning({ id: toolTable.id, name: toolTable.name });
	t.forEach((tool) => {
		for (let i = 0; i < faker.helpers.rangeToNumber({ min: 1, max: 3 }); i++) {
			toolBins.push({
				tool_id: tool.id,
				bin: faker.git.branch().toLowerCase()
			});
		}
	});

	await db.insert(toolBinTable).values(toolBins);
};

await seed();
