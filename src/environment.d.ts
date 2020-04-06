declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SERVER_PORT: string
      NODE_ENV: 'development'
      TYPEORM_CONNECTION: string
      TYPEORM_HOST: string
      TYPEORM_USERNAME: string
      TYPEORM_PASSWORD: string
      TYPEORM_DATABASE: string
      TYPEORM_PORT: string
      TYPEORM_SYNCHRONIZE: string | 'true'
      TYPEORM_ENTITIES: string
    }
  }
}

export { }
