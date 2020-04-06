import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'

import { User } from './models/user.model'
import { UserService } from './user.service'
import { UserInput } from './models/user.input'

@Resolver(User)
export class UserResolver {
  constructor(private readonly userService : UserService) { }

  @Query(returns => [User])
  users(): Promise<User[]> {
    return this.userService.getAllUsers()
  }

  @Mutation(returns => User)
  saveUser(
    @Args('data') data: UserInput,
    @Args('id', { type: () => ID, nullable: true }) id?: string
  ) : Promise<User> {
    return this.userService.saveUser({ ...data, id } as User)
  }

  @Mutation(returns => Boolean)
  deleteUser(
    @Args('id', { type: () => ID }) userId: string
  ) : Promise<Boolean> {
    return this.userService.deleteUserById(userId)
  }
}
