import { relations } from 'drizzle-orm'
import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core'
import { recordings } from './recordings'

export const labels = sqliteTable(
  'labels',
  {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
  },
  table => ({
    idIdx: uniqueIndex('labels_id_idx').on(table.id),
  }),
)

export const labelsRelations = relations(labels, ({ many }) => ({
  recordings: many(recordings),
}))

export type Label = typeof labels.$inferSelect
