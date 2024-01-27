import { eq } from 'drizzle-orm'
import { type Static, t } from 'elysia'
import type { DrizzleDb } from '../connect'
import { catalogues } from '../schema/catalogues'
import { composers } from '../schema/composers'
import { works } from '../schema/works'

export const WorkMetadata = t.Object({
  title: t.String(),
  composerFirstName: t.String(),
  composerLastName: t.String(),
  composerSlug: t.String(),
  catalogueName: t.Nullable(t.String()),
  catalogueNumber: t.Nullable(t.Number()),
  cataloguePostfix: t.Nullable(t.String()),
  yearStart: t.Nullable(t.Number()),
  yearFinish: t.Nullable(t.Number()),
  no: t.Nullable(t.Number()),
  nickname: t.Nullable(t.String()),
})

export type WorkMetadata = Static<typeof WorkMetadata>

export async function getWorkMetadata(
  db: DrizzleDb,
  workId: number,
): Promise<WorkMetadata | undefined> {
  const allWorks = await db
    .select({
      title: works.title,
      composerFirstName: composers.firstName,
      composerLastName: composers.lastName,
      composerSlug: composers.slug,
      catalogueName: catalogues.name,
      catalogueNumber: works.catalogueNumber,
      cataloguePostfix: works.cataloguePostfix,
      yearStart: works.yearStart,
      yearFinish: works.yearFinish,
      no: works.no,
      nickname: works.nickname,
    })
    .from(works)
    .innerJoin(composers, eq(composers.id, works.composerId))
    .leftJoin(catalogues, eq(catalogues.id, works.catalogueId))
    .where(eq(works.id, workId))

  return allWorks[0]
}
