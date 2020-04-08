import { Injectable } from '@nestjs/common'
import { Repository, UpdateResult } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { Post } from './post.entity'
import { PostMapper } from './post.mapper'
import { PostInput } from './models/post.input'
import { PostOutput } from './models/post.output'

@Injectable()
export class PostService {
  constructor(
    private readonly postMapper: PostMapper,
    @InjectRepository(Post) private readonly postRepository: Repository<Post>
  ) { }
 
  async savePostForUser(userId: string, postInput: PostInput): Promise<PostOutput> {
    const postEntity = this.postMapper.mapInputToEntity(userId, postInput)
    const post = await this.postRepository.save(postEntity)

    return this.postMapper.mapEntityToOutput(post)
  }

  savePostsForUser(userId: string, posts: PostInput[]): Promise<PostOutput[]> {
    return Promise.all(posts.map(post => this.savePostForUser(userId, post)))
  }

  deletePostsByUserId(userId: string): Promise<UpdateResult> {
    return this.postRepository.softDelete({ userId })
  }

  deletePostById(postId: string): Promise<UpdateResult> {
    return this.postRepository.softDelete(postId)
  }

  async getPostById(postId: string): Promise<PostOutput> {
    const post = await this.postRepository.findOne(postId)

    return this.postMapper.mapEntityToOutput(post!)
  }

  async getPostsByUserId(userId: string): Promise<PostOutput[]> {
    const posts = await this.postRepository.find({ where: { userId } })

    return posts.map(this.postMapper.mapEntityToOutput)
  }
}
