export const config = () => ({
  app: {
    name: process.env.APP_NAME || 'Demo app',
    port: +process.env.PORT || 8000
  },
  database: {
    name: process.env.DATABASE_NAME || '',
    type: process.env.DATABASE_TYPE || '',
    database: process.env.DATABASE_DB || '',
    synchronize: process.env.DATABASE_SYNC == "true",
    dropSchema: false,
    logging: false,
    entities: ['dist/**/*.entity.js', '**/*.entity.js'],
    migrations: ["dist/migration/*.js", "migration/*.js"],
    // subscribers: ['dist/subscriber/**/*.js']
    // cli: { migrationsDir: "migration" }
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
    poolId: process.env.COGNITO_POOL_ID,
    clientId: process.env.COGNITO_CLIENT_ID,
    clientSecret: process.env.COGNITO_CLIENT_SECRET,
    clientDomain: process.env.COGNITO_CLIENT_DOMAIN,
    clientRegion: process.env.COGNITO_CLIENT_REGION,
  }
})

export type Config = ReturnType<typeof config>
export type SwaggerConfig = Config['swagger']
export type DbConfig = Config['database']