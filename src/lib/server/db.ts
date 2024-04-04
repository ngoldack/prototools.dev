import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client/web';
import { env } from '$env/dynamic/private';
import { } from 'drizzle-orm/migrator'
import { toolTable } from '$lib/schemas/tool.schema';
import { sessionTable, userTable } from '$lib/schemas/auth.schema';

const client = createClient({ url: env.DATABASE_URL, authToken: env.DATABASE_AUTH_TOKEN });
export const db = drizzle(client, {
    logger: true,
    schema: {
        tool: toolTable,
        user: userTable,
        session: sessionTable
    }
});
