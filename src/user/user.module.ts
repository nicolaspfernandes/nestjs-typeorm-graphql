import { TypeOrmModule } from '@nestjs/typeorm'
import { Module, forwardRef } from '@nestjs/common'

import { User } from './user.entity'
import { UserMapper } from './user.mapper'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'

import { PostModule } from '../post/post.module'
import { LoginModule } from '../login/login.module'

@Module({
  providers: [UserResolver, UserService, UserMapper],
  imports: [
    forwardRef(() => PostModule),
    forwardRef(() => LoginModule),
    TypeOrmModule.forFeature([User])
  ],
  exports: [UserService, UserMapper],
})
export class UserModule { }
