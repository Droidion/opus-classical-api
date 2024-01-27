import { relations } from 'drizzle-orm'
import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core'
import { works } from './works'

export const genres = sqliteTable(
  'genres',
  {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
    icon: text('icon').notNull(),
  },
  table => ({
    idIdx: uniqueIndex('genres_id_idx').on(table.id),
  }),
)

export const genresRelations = relations(genres, ({ many }) => ({
  works: many(works),
}))

export type Genre = typeof genres.$inferSelect
