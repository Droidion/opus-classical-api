import { type LibSQLDatabase, drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import * as schema from './schema'

export type DrizzleDb = LibSQLDatabase<typeof schema>

export function dbConnect(): DrizzleDb {
  return drizzle(
    createClient({
      url: Bun.env.DATABASE_URL,
      authToken: Bun.env.DATABASE_AUTH_TOKEN,
    }),
    { schema },
  )
}
