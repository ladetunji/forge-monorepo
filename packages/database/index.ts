import 'server-only';

import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { env } from '../env/db';

const client = neon(env.DATABASE_URL as string);

export const database = drizzle({ client });