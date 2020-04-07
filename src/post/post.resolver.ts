import { ID, Args, Resolver, Mutation } from '@nestjs/graphql'

import { PostInput } from './models/post.input'
import { PostService } from '../post/post.service'
import { PostOutput } from '../post/models/post.output'

@Resolver(PostOutput)
export class PostResolver {
  constructor(private readonly postService: PostService) { }

  @Mutation(returns => PostOutput)
  async savePost(
    @Args('userId', { type: () => ID }) userId: string,
    @Args('postInput') postInput: PostInput
  ): Promise<PostOutput> {
    return this.postService.savePostForUser(userId, postInput)
  }

  @Mutation(returns => Boolean)
  async deletePost(
    @Args('postId', { type: () => ID }) postId: string
  ): Promise<Boolean> {
    await this.postService.deletePostById(postId)

    return true
  }
}
