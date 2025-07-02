import { defineConfig } from 'drizzle-kit';
import { env } from '../env';

export default defineConfig({
    schema: './schema.ts',
    out: './',
    dialect: 'postgresql',
    dbCredentials: {
        url: env.DATABASE_URL as string,
    },
});