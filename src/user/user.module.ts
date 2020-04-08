import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { User } from './user.entity'
import { UserMapper } from './user.mapper'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'

import { Post } from '../post/post.entity'
import { PostMapper } from '../post/post.mapper'
import { PostService } from '../post/post.service'

@Module({
  exports: [TypeOrmModule],
  providers: [UserResolver, UserService, UserMapper, PostMapper, PostService],
  imports: [TypeOrmModule.forFeature([User, Post])]
})
export class UserModule { }
