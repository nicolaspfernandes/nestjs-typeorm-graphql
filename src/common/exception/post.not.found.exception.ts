import { HttpException, HttpStatus } from '@nestjs/common'

export class PostNotFoundException extends HttpException {
  constructor(postId: string) {
    super(`Post not found (${postId})`, HttpStatus.NOT_FOUND)
  }
}
