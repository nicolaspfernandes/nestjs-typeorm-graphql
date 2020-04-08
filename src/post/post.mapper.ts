import { Injectable } from '@nestjs/common'

import { Post } from './post.entity'
import { PostInput } from './models/post.input'
import { PostOutput } from './models/post.output'

@Injectable()
export class PostMapper {
  mapInputToEntity(userId: string, postInput: PostInput): Post {
    return {
      id: postInput.id,
      user: { id: userId },
      title: postInput.title,
      description: postInput.description
    } as Post
  }

  mapEntityToOutput(post: Post): PostOutput {
    return {
      id: post.id,
      title: post.title,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      description: post.description
    } as PostOutput
  }
}
