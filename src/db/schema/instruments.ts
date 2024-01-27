import { relations } from 'drizzle-orm'
import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core'
import { performersRecordingsInstruments } from './performersRecordingsInstruments'

export const instruments = sqliteTable(
  'instruments',
  {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
  },
  table => ({
    idIdx: uniqueIndex('instruments_id_idx').on(table.id),
  }),
)

export const instrumentsRelations = relations(instruments, ({ many }) => ({
  performersToRecordingsToInstruments: many(performersRecordingsInstruments),
}))

export type Instrument = typeof instruments.$inferSelect
