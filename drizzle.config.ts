import { defineConfig } from 'drizzle-kit';
export default defineConfig({
	out: 'src/migrations',
	schema: './src/lib/schemas/*.schema.ts',
	driver: 'turso',
	dbCredentials: {
		url: process.env.DATABASE_URL!,
		authToken: process.env.DATABASE_AUTH_TOKEN!
	},
	verbose: true,
	strict: true
});
