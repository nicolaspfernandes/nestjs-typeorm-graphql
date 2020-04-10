import { Resolver, Args, Query, Mutation } from '@nestjs/graphql'

import { LoginService } from './login.service'
import { LoginInput } from './models/login.input'
import { LoginOutput } from './models/login.output'
import { CreateLoginInput } from './models/create.login.input'

@Resolver(LoginOutput)
export class LoginResolver {
  constructor(private readonly loginService: LoginService) { }

  @Query(returns => String)
  login(@Args('loginInput') loginInput: LoginInput): Promise<string> {
    return this.loginService.login(loginInput)
  }

  @Mutation(returns => String)
  createLogin(
    @Args('createLoginInput') createLoginInput: CreateLoginInput
  ): Promise<string> {
    return this.loginService.createLoginForUser(createLoginInput)
  }
}
