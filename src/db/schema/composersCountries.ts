import { relations } from 'drizzle-orm'
import {
  index,
  integer,
  primaryKey,
  sqliteTable,
} from 'drizzle-orm/sqlite-core'
import { composers } from './composers'
import { countries } from './countries'

export const composersCountries = sqliteTable(
  'composers_countries',
  {
    composerId: integer('composer_id')
      .notNull()
      .references(() => composers.id),
    countryId: integer('country_id')
      .notNull()
      .references(() => countries.id),
  },
  t => ({
    pk: primaryKey({ columns: [t.composerId, t.countryId] }),
    composerIdIdx: index('composers_composer_id_idx').on(t.composerId),
    countryIdIdx: index('composers_country_id_idx').on(t.countryId),
  }),
)

export const composersCountriesRelations = relations(
  composersCountries,
  ({ one }) => ({
    composer: one(composers, {
      fields: [composersCountries.composerId],
      references: [composers.id],
    }),
    country: one(countries, {
      fields: [composersCountries.countryId],
      references: [countries.id],
    }),
  }),
)

export type ComposersCountries = typeof composersCountries.$inferSelect
