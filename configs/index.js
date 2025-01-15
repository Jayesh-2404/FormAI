import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL_CONFIG);
// const db = drizzle({ client: sql });
import * as schema from './schema';

export const db = drizzle(sql, { schema });