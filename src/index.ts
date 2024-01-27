import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { cors } from '@elysiajs/cors'
import { jwt } from '@elysiajs/jwt'
import composers from './endpoints/composers'
import { composer } from './endpoints/composer'
import { admin } from './endpoints/admin'
import { works } from './endpoints/works'

const app = new Elysia()
  .use(cors())
  .use(
    jwt({
      name: 'jwt',
      secret: Bun.env.SUPABASE_JWT_SECRET,
    }),
  )
  .use(
    swagger({
      provider: 'swagger-ui',
      documentation: {
        openapi: '3.1.0',
        info: {
          title: 'Opus Classical API',
          version: '1.0.0',
        },
      },
    }),
  )
  .group('/public', app => app.use(composers).use(composer).use(works))
  .guard(
    {
      async beforeHandle({ set, jwt, headers: { authorization } }) {
        const profile = await jwt.verify(authorization)
        if (!profile) {
          set.status = 401
          return 'Unauthorized'
        }
        return set
      },
    },
    app => app.group('/admin', app => app.use(admin)),
  )
  .listen(Bun.env.PORT || 3000)

export type App = typeof app

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
)
