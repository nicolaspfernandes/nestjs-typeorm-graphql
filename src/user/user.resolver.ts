import {
  ID,
  Args,
  Query,
  Parent,
  Resolver,
  Mutation,
  ResolveField
} from '@nestjs/graphql'

import { UserService } from './user.service'
import { UserInput } from './models/user.input'
import { UserOutput } from './models/user.output'

import { PostService } from '../post/post.service'
import { PostOutput } from '../post/models/post.output'

@Resolver(UserOutput)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService
  ) { }

  @Query(returns => [UserOutput])
  users(): Promise<UserOutput[]> {
    return this.userService.getAllUsers()
  }

  @Mutation(returns => UserOutput)
  async saveUser(@Args('userInput') userInput: UserInput): Promise<UserOutput> {
    const user = await this.userService.saveUser(userInput)

    if (userInput.posts && userInput.posts.length > 0) {
      user.posts = await this.postService.savePostsForUser(
        user.id,
        userInput.posts
      )
    }

    return user
  }

  @Mutation(returns => Boolean)
  async deleteUser(
    @Args('userId', { type: () => ID }) userId: string
  ): Promise<Boolean> {
     await Promise.all([
       this.userService.deleteUserById(userId),
       this.postService.deletePostsByUserId(userId)
     ])

     return true
  }

  @ResolveField()
  async posts(@Parent() user: UserOutput): Promise<PostOutput[]> {
    return this.postService.getPostsByUserId(user.id)
  }
}
