declare module 'bun' {
  interface Env {
    DATABASE_URL: string
    DATABASE_AUTH_TOKEN: string
    PORT: string
    SUPABASE_JWT_SECRET: string
  }
}
