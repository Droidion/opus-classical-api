import { relations } from 'drizzle-orm'
import {
  type AnySQLiteColumn,
  index,
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core'
import { catalogues } from './catalogues'
import { composers } from './composers'
import { genres } from './genres'

export const works = sqliteTable(
  'works',
  {
    id: integer('id').primaryKey(),
    title: text('title').notNull(),
    composerId: integer('composer_id')
      .notNull()
      .references(() => composers.id),
    yearStart: integer('year_start'),
    yearFinish: integer('year_finish'),
    averageMintues: integer('average_minutes').notNull(),
    parentWorkId: integer('parent_work_id')
      .notNull()
      .references((): AnySQLiteColumn => works.id),
    catalogueId: integer('catalogue_id')
      .notNull()
      .references(() => catalogues.id),
    catalogueNumber: integer('catalogue_number'),
    cataloguePostfix: text('catalogue_postfix'),
    no: integer('no'),
    nickname: text('nickname'),
    sort: integer('sort'),
    genreId: integer('genre_id')
      .notNull()
      .references(() => genres.id),
  },
  (table) => {
    return {
      idIdx: uniqueIndex('works_id_idx').on(table.id),
      catalogueIdIdx: index('works_catalogue_id').on(table.catalogueId),
      composerIdIdx: index('works_composer_id_idx').on(table.composerId),
      genreIdIdx: index('works_genre_id_idx').on(table.genreId),
      parentWorkIdIdx: index('works_parent_work_id_idx').on(table.parentWorkId),
    }
  },
)

export const worksRelations = relations(works, ({ one }) => ({
  composer: one(composers, {
    fields: [works.composerId],
    references: [composers.id],
  }),
  parentWork: one(works, {
    fields: [works.parentWorkId],
    references: [works.id],
  }),
  catalogue: one(catalogues, {
    fields: [works.catalogueId],
    references: [catalogues.id],
  }),
  genre: one(genres, {
    fields: [works.genreId],
    references: [genres.id],
  }),
}))

export type Work = typeof works.$inferSelect
