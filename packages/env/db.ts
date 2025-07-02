import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const DATABASE_URL_SCHEMA = z.string().min(1).url();

const server: Parameters<typeof createEnv>[0]['server'] = {
    DATABASE_URL: DATABASE_URL_SCHEMA,
};

const client: Parameters<typeof createEnv>[0]['client'] = {};

export const env = createEnv({
    client,
    server,
    runtimeEnv: {
        DATABASE_URL: process.env.DATABASE_URL as string,
    },
});
