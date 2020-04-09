import {
  ID,
  Args,
  Query,
  Parent,
  Resolver,
  Mutation,
  ResolveField
} from '@nestjs/graphql'

import { PostInput } from './models/post.input'
import { PostService } from '../post/post.service'
import { PostOutput } from '../post/models/post.output'

import { UserService } from '../user/user.service'
import { UserOutput } from '../user/models/user.output'

import { LikeService } from '../like/like.service'

@Resolver(PostOutput)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly likeService: LikeService,
    private readonly userService: UserService
  ) { }

  @Query(returns => PostOutput)
  post(
    @Args('postId', { type: () => ID }) postId: string
  ): Promise<PostOutput> {
    return this.postService.getPostById(postId)
  }

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

  @ResolveField()
  async numberOfLikes(@Parent() post: PostOutput): Promise<Number> {
    return this.likeService.countLikesByPost(post.id)
  }

  @ResolveField()
  async usersWhoLiked(@Parent() post: PostOutput): Promise<UserOutput[]> {
    const likesForPost = await this.likeService.getlikesByPost(post.id)
    const usersFromLikes = likesForPost.map(like => like.userId)

    if (usersFromLikes.length === 0) {
      return []
    }

    return this.userService.getUsersByIds(usersFromLikes)
  }
}
