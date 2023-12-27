import { Elysia, NotFoundError, t } from 'elysia'
import { dbConnect } from '../db/connect'
import { ComposerBySlug, getComposerBySlug } from '../db/queries/composerBySlug'
import { WorksByGenres, getWorksByGenres } from '../db/queries/worksByGenres'

export const composer = new Elysia({ prefix: '/composer' })
  .model({
    ComposerBySlug,
    WorksByGenres,
  })
  .get(
    '/slug/:slug',
    async ({ params: { slug } }) => {
      const composer = await getComposerBySlug(dbConnect(), slug)
      if (composer === null) {
        throw new NotFoundError()
      }
      return composer
    },
    {
      params: t.Object({
        slug: t.String(),
      }),
      response: 'ComposerBySlug',
      detail: {
        summary: 'Get composer metadata by his or her URL-firently code.',
      },
    },
  )
  .get(
    '/id/:composerId/works',
    async ({ params: { composerId } }) =>
      await getWorksByGenres(dbConnect(), composerId),
    {
      params: t.Object({
        composerId: t.Numeric(),
      }),
      response: 'WorksByGenres',
      detail: {
        summary: 'Get all musical works by a composer.',
      },
    },
  )
