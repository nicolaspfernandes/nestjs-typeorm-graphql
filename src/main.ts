import { AppModule } from './app.module'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'

const { SERVER_PORT } = process.env

;(async function bootstrap() {
  const application = await NestFactory.create(AppModule)

  application.enableCors()
  application.useGlobalPipes(new ValidationPipe())

  await application.listen(SERVER_PORT)

  console.log(`Application is running on: http://localhost:${SERVER_PORT}`)
})()
