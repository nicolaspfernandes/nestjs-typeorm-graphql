import { Args, Resolver, Mutation } from '@nestjs/graphql'

import { LikeService } from './like.service'
import { LikeInput } from './models/like.input'
import { LikeOutput } from './models/like.output'

@Resolver(LikeOutput)
export class LikeResolver {
  constructor(private readonly likeService: LikeService) { }

  @Mutation(returns => LikeOutput)
  likePost(@Args('likeInput') likeInput: LikeInput): Promise<LikeOutput> {
    return this.likeService.likePostForUser(likeInput)
  }

  @Mutation(returns => LikeOutput)
  unlikePost(@Args('unlikeInput') unlikeInput: LikeInput): Promise<LikeOutput> {
    return this.likeService.unlinkePostForUser(unlikeInput)
  }
}
