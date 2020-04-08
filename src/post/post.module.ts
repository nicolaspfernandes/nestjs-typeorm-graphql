import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Post } from './post.entity'
import { PostMapper } from './post.mapper'
import { PostService } from './post.service'
import { PostResolver } from './post.resolver'

@Module({ 
  exports: [TypeOrmModule],
  providers: [PostResolver, PostService, PostMapper],
  imports: [TypeOrmModule.forFeature([Post])]
})
export class PostModule { }
