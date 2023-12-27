import { Elysia } from 'elysia'
import {
  ComposersByPeriods,
  getComposersByPeriods,
} from '../db/queries/composersByPeriods'
import { FoundComposers, searchComposers } from '../db/queries/searchComposers'
import { dbConnect } from '../db/connect'

export default new Elysia({ prefix: '/composers' })
  .model({
    ComposersByPeriods,
    FoundComposers,
  })
  .get('/', async () => await getComposersByPeriods(dbConnect()), {
    response: 'ComposersByPeriods',
    detail: {
      summary: 'Get the list of composers grouped by historical periods.',
    },
  })
  .get('/search', async () => await searchComposers(dbConnect()), {
    response: 'FoundComposers',
    detail: {
      summary: 'Search for composers by first or last name.',
    },
  })
