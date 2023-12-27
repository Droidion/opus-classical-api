import { eq } from 'drizzle-orm'
import type { DrizzleDb } from '../connect'
import { composers } from '../schema/composers'
import { getCountriesByComposer } from './countriesByComposer'
import { t, type Static } from 'elysia'

export const ComposerBySlug = t.Object({
  id: t.Number(),
  firstName: t.String(),
  lastName: t.String(),
  yearBorn: t.Number(),
  yearDied: t.Nullable(t.Number()),
  slug: t.String(),
  wikipediaLink: t.Nullable(t.String()),
  imslpLink: t.Nullable(t.String()),
  countries: t.String(),
})

export type ComposerBySlug = Static<typeof ComposerBySlug>

export async function getComposerBySlug(
  db: DrizzleDb,
  slug: string,
): Promise<ComposerBySlug | null> {
  const composerData = await db
    .select({
      id: composers.id,
      firstName: composers.firstName,
      lastName: composers.lastName,
      yearBorn: composers.yearBorn,
      yearDied: composers.yearDied,
      slug: composers.slug,
      wikipediaLink: composers.wikipediaLink,
      imslpLink: composers.imslpLink,
    })
    .from(composers)
    .where(eq(composers.slug, slug))

  if (composerData[0]) {
    const countriesData = await getCountriesByComposer(db, composerData[0].id)
    return {
      ...composerData[0],
      countries: countriesData.map(country => country.name).join(', '),
    }
  }

  return null
}
