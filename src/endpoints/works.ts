import { Elysia, NotFoundError, t } from 'elysia'
import { dbConnect } from '../db/connect'
import {
  RecordingsByWork,
  getRecordingsByWork,
} from '../db/queries/recordingsByWork'
import { WorkMetadata, getWorkMetadata } from '../db/queries/workMetadata'

export const works = new Elysia({ prefix: '/works' })
  .model({
    WorkMetadata,
    RecordingsByWork,
  })
  .get(
    '/:workId',
    async ({ params: { workId } }) => {
      const work = await getWorkMetadata(dbConnect(), workId)
      if (work === undefined)
        throw new NotFoundError()

      return work
    },
    {
      params: t.Object({
        workId: t.Numeric(),
      }),
      response: 'WorkMetadata',
      detail: {
        summary: 'Get full metadata of a single muscial work.',
      },
    },
  )
  .get(
    '/:workId/recordings',
    async ({ params: { workId } }) =>
      await getRecordingsByWork(dbConnect(), workId),
    {
      params: t.Object({
        workId: t.Numeric(),
      }),
      response: 'RecordingsByWork',
      detail: {
        summary: 'Get all recordings for a musical work.',
      },
    },
  )
