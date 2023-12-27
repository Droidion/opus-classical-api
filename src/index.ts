import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { cors } from '@elysiajs/cors'
import composers from './endpoints/composers'
import { composer } from './endpoints/composer'
import { works } from './endpoints/works'

const app = new Elysia()
  .use(cors())
  .use(
    swagger({
      documentation: {
        info: {
          title: 'Opus Classical API',
          version: '1.0.0',
        },
      },
    }),
  )
  .group('/public', app => app.use(composers).use(composer).use(works))
  .listen(Bun.env.PORT || 3000)

export type App = typeof app

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
)
