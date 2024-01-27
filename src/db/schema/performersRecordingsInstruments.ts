import { relations } from 'drizzle-orm'
import {
  index,
  integer,
  primaryKey,
  sqliteTable,
} from 'drizzle-orm/sqlite-core'
import { instruments } from './instruments'
import { performers } from './performers'
import { recordings } from './recordings'

export const performersRecordingsInstruments = sqliteTable(
  'performers_recordings_instruments',
  {
    performerId: integer('performer_id')
      .notNull()
      .references(() => performers.id),
    recordingId: integer('recording_id')
      .notNull()
      .references(() => recordings.id),
    instrumentId: integer('instrument_id')
      .notNull()
      .references(() => instruments.id),
    priority: integer('priority'),
  },
  t => ({
    pk: primaryKey({ columns: [t.performerId, t.recordingId, t.instrumentId] }),
    recordingIdIdx: index('pri_recording_id_idx').on(t.recordingId),
    performerIdIdx: index('pri_performer_id_idx').on(t.performerId),
    instrumentIdIdx: index('pri_instrument_id_idx').on(t.instrumentId),
  }),
)

export const performersRecordingsInstrumentsRelations = relations(
  performersRecordingsInstruments,
  ({ one }) => ({
    performer: one(performers, {
      fields: [performersRecordingsInstruments.performerId],
      references: [performers.id],
    }),
    recording: one(recordings, {
      fields: [performersRecordingsInstruments.recordingId],
      references: [recordings.id],
    }),
    instrument: one(instruments, {
      fields: [performersRecordingsInstruments.instrumentId],
      references: [instruments.id],
    }),
  }),
)

export type PerformersRecordingsInstruments =
  typeof performersRecordingsInstruments.$inferSelect
