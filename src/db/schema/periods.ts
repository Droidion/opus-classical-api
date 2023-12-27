import { relations } from 'drizzle-orm'
import { composers } from './composers'
import {
  sqliteTable,
  integer,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core'

export const periods = sqliteTable(
  'periods',
  {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
    yearStart: integer('year_start'),
    yearEnd: integer('year_end'),
    slug: text('slug').notNull(),
  },
  table => ({
    idIdx: uniqueIndex('periods_id_idx').on(table.id),
  }),
)

export const periodsRelations = relations(periods, ({ many }) => ({
  composers: many(composers),
}))

export type Period = typeof periods.$inferSelect
