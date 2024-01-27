# Opus Classical REST API

## Requirements

- Have Bun installed.
- Have Turso database available.
- Work from folder `/api`.
- Create `.env` file.

```dotenv
DATABASE_URL=libsql://opus-classical-droidion.turso.io
DATABASE_AUTH_TOKEN=token
PORT=3000
```

## Run locally

- `$ bun run dev`.

## Run in Docker

- `$ docker compose up`

## Deploy

- Authenticate to fly.io.
- From monorepo root run `$ make depoly_api`.
