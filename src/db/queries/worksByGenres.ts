import { and, eq, isNull } from 'drizzle-orm'
import type { DrizzleDb } from '../connect'
import { catalogues } from '../schema'
import { genres } from '../schema/genres'
import { works } from '../schema/works'
import { t, type Static } from 'elysia'

export const Work = t.Object({
  id: t.Number(),
  title: t.String(),
  yearStart: t.Nullable(t.Number()),
  yearFinish: t.Nullable(t.Number()),
  averageMintues: t.Number(),
  catalogueName: t.Nullable(t.String()),
  catalogueNumber: t.Nullable(t.Number()),
  cataloguePostfix: t.Nullable(t.String()),
  no: t.Nullable(t.Number()),
  nickname: t.Nullable(t.String()),
  genreName: t.String(),
})

export type Work = Static<typeof Work>

export const WorksByGenres = t.Array(
  t.Object({
    genreId: t.Number(),
    genreName: t.String(),
    works: t.Array(Work),
  }),
)

export type WorksByGenres = Static<typeof WorksByGenres>

export async function getWorksByGenres(
  db: DrizzleDb,
  composerId: number,
): Promise<WorksByGenres> {
  const worksData = await db
    .select({
      id: works.id,
      title: works.title,
      yearStart: works.yearStart,
      yearFinish: works.yearFinish,
      averageMintues: works.averageMintues,
      catalogueName: catalogues.name,
      catalogueNumber: works.catalogueNumber,
      cataloguePostfix: works.cataloguePostfix,
      no: works.no,
      nickname: works.nickname,
      genreId: genres.id,
      genreName: genres.name,
    })
    .from(works)
    .innerJoin(genres, eq(genres.id, works.genreId))
    .leftJoin(catalogues, eq(catalogues.id, works.catalogueId))
    .where(and(eq(works.composerId, composerId), isNull(works.parentWorkId)))
    .orderBy(genres.name, works.sort, works.yearFinish)

  return worksData.reduce((result: WorksByGenres, obj) => {
    const target = result.find(group => group.genreId === obj.genreId)
    if (target) {
      target.works.push(obj)
    } else {
      result.push({
        genreName: obj.genreName,
        genreId: obj.genreId,
        works: [obj],
      })
    }
    return result
  }, [])
}
