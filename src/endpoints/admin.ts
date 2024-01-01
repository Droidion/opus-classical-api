import { t, Elysia } from 'elysia'
import { dbConnect } from '../db/connect'
import {
  addCountry,
  deleteCountry,
  getCountries,
  updateCountry,
} from '../db/queries/countries'

const Country = t.Object({
  id: t.Number(),
  name: t.String(),
})

const Countries = t.Array(Country)

const NewCountry = t.Object({
  id: t.Optional(t.Number()),
  name: t.String(),
})

export const admin = new Elysia()
  .model({
    Country,
    Countries,
    NewCountry,
  })
  .get('/countries', async () => {
    return await getCountries(dbConnect())
  })
  .post(
    '/countries',
    async ({ body }) => {
      return await addCountry(dbConnect(), body)
    },
    {
      body: 'NewCountry',
      response: 'Countries',
    },
  )
  .put(
    '/countries/:id',
    async ({ params: { id }, body }) => {
      await updateCountry(dbConnect(), id, body)
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
      body: 'Country',
    },
  )
  .delete(
    '/countries/:id',
    async ({ params: { id } }) => {
      await deleteCountry(dbConnect(), id)
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    },
  )
