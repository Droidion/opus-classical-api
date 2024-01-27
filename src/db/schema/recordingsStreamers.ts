import { relations } from 'drizzle-orm'
import {
  index,
  integer,
  primaryKey,
  sqliteTable,
  text,
} from 'drizzle-orm/sqlite-core'
import { recordings } from './recordings'
import { streamers } from './streamers'

export const recordingsStreamers = sqliteTable(
  'recordings_streamers',
  {
    recordingId: integer('recording_id')
      .notNull()
      .references(() => recordings.id),
    streamerId: integer('streamer_id')
      .notNull()
      .references(() => streamers.id),
    link: text('link').notNull(),
    isShow: integer('is_show', { mode: 'boolean' }).notNull(),
  },
  t => ({
    pk: primaryKey({ columns: [t.recordingId, t.streamerId] }),
    recordingIdIdx: index('rs_recording_id_idx').on(t.recordingId),
    streamerIdIdx: index('rs_streamer_id_idx').on(t.streamerId),
  }),
)

export const recordingsStreamersRelations = relations(
  recordingsStreamers,
  ({ one }) => ({
    recording: one(recordings, {
      fields: [recordingsStreamers.recordingId],
      references: [recordings.id],
    }),
    streamer: one(streamers, {
      fields: [recordingsStreamers.streamerId],
      references: [streamers.id],
    }),
  }),
)

export type RecordingsStreamers = typeof recordingsStreamers.$inferSelect
