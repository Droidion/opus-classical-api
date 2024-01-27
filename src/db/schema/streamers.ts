import { relations } from 'drizzle-orm'
import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core'
import { recordingsStreamers } from './recordingsStreamers'

export const streamers = sqliteTable(
  'streamers',
  {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
    iconName: text('icon_name').notNull(),
    appPrefix: text('app_prefix').notNull(),
  },
  table => ({
    idIdx: uniqueIndex('streamers_id_idx').on(table.id),
  }),
)

export const streamersRelations = relations(streamers, ({ many }) => ({
  recordingsStreamers: many(recordingsStreamers),
}))

export type Streamer = typeof streamers.$inferSelect
