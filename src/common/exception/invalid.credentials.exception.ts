import { HttpException, HttpStatus } from '@nestjs/common'

export class InvalidCredentialsException extends HttpException {
  constructor() {
    super('Invalid username and/or password', HttpStatus.FORBIDDEN)
  }
}