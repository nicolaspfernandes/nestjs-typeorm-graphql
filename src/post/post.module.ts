import { TypeOrmModule } from '@nestjs/typeorm'
import { Module, forwardRef } from '@nestjs/common'

import { Post } from './post.entity'
import { PostMapper } from './post.mapper'
import { PostService } from './post.service'
import { PostResolver } from './post.resolver'

import { UserModule } from '../user/user.module'
import { LikeModule } from '../like/like.module'

@Module({
  providers: [PostResolver, PostService, PostMapper],
  imports: [
    LikeModule,
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([Post])
  ],
  exports: [TypeOrmModule, PostService, PostMapper]
})
export class PostModule { }
