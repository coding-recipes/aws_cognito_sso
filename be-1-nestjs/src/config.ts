export const config = () => ({
  app: {
    name: process.env.APP_NAME || 'Demo app',
    port: process.env.PORT || 8001
  },
  database: {
    name: process.env.DATABASE_NAME,
    type: process.env.DATABASE_TYPE,
    database: process.env.DATABASE_DB,
    synchronize: true,
    dropSchema: true,
    logging: true,
    entities: ['dist/entities/*.js'],
    migrations: ['dist/migration/**/*.js'],
    subscribers: ['dist/subscriber/**/*.js']
  },
  swagger: {
    title: "NestJS Auth API",
    description: "This is a sample auth API.",
    version: "1.0",
    route: "/docs",
    tags: [
      { "name": "auth", "description": "Auth related end-points" }
    ],
    contact: { name: "Author", url: "", email: "" }
  },
  cognito: {
    endpoint: process.env.COGNITO_ENDPOINT,
    tokenRoute: process.env.COGNITO_TOKEN_ROUTE,
    clientId: process.env.COGNITO_CLIENT_ID,
    clientSecret: process.env.COGNITO_CLIENT_SECRET
  }
})

export type Config = ReturnType<typeof config>
export type SwaggerConfig = Config['swagger']
export type DbConfig = Config['database']