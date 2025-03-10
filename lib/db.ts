import { drizzle } from "drizzle-orm/postgres-js";
import postgres from 'postgres';
import * as schema from '@/lib/schema'

const connection = process.env.DATABASE_URL || '';
const client = postgres(connection, {prepare: false});
const db = drizzle(client, {schema})

export default db;