import type { DrizzleDb } from '../connect'
import { composers } from '../schema/composers'
import { t, type Static } from 'elysia'

export const FoundComposers = t.Array(
  t.Object({
    firstName: t.String(),
    lastName: t.String(),
    slug: t.String(),
  }),
)

export type FoundComposers = Static<typeof FoundComposers>

export async function searchComposers(db: DrizzleDb): Promise<FoundComposers> {
  return await db
    .select({
      firstName: composers.firstName,
      lastName: composers.lastName,
      slug: composers.slug,
    })
    .from(composers)
}
