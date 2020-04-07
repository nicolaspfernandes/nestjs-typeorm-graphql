import { Injectable } from '@nestjs/common'
import { Repository, UpdateResult } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { Post } from './post.entity'
import { PostInput } from './models/post.input'
import { PostOutput } from './models/post.output'

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>
  ) { }

  private mapInputToPost(userId: string, postInput: PostInput): Post {
    return {
      id: postInput.id,
      title: postInput.title,
      description: postInput.description,
      user: { id: userId }
    } as Post
  }

  private mapPostToOutput(post: Post): PostOutput {
    return {
      id: post.id,
      title: post.title,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      description: post.description
    } as PostOutput
  }
 
  async savePostForUser(
    userId: string,
    postInput: PostInput
  ): Promise<PostOutput> {
    const post = await this.postRepository.save(this.mapInputToPost(
      userId,
      postInput
    ))

    return this.mapPostToOutput(post)
  }

  savePostsForUser(userId: string, posts: PostInput[]): Promise<PostOutput[]> {
    return Promise.all(posts.map(post => this.savePostForUser(userId, post)))
  }

  deletePostsByUserId(userId: string): Promise<UpdateResult> {
    return this.postRepository.softDelete({ user: { id: userId }})
  }

  deletePostById(postId: string): Promise<UpdateResult> {
    return this.postRepository.softDelete(postId)
  }

  async getPostsByUserId(userId: string): Promise<PostOutput[]> {
    const posts = await this.postRepository.find({
      where: {
        user: { id: userId }
      }
    })

    return posts.map(this.mapPostToOutput)
  }
}
