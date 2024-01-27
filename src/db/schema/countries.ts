import { relations } from 'drizzle-orm'
import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core'
import { composersCountries } from './composersCountries'

export const countries = sqliteTable(
  'countries',
  {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
  },
  table => ({
    idIdx: uniqueIndex('countries_id_idx').on(table.id),
  }),
)

export const countriesRelations = relations(countries, ({ many }) => ({
  composersToCountries: many(composersCountries),
}))

export type Country = typeof countries.$inferSelect
export type NewCountry = typeof countries.$inferInsert
