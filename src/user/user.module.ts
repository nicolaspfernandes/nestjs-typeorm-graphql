import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { User } from './user.entity'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'

import { Post } from '../post/post.entity'
import { PostService } from '../post/post.service'

@Module({
  exports: [TypeOrmModule],
  providers: [UserResolver, UserService, PostService],
  imports: [TypeOrmModule.forFeature([User, Post])]
})
export class UserModule { }
