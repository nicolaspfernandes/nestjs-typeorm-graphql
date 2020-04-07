import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Post } from './post.entity'
import { PostService } from './post.service'
import { PostResolver } from './post.resolver'

@Module({ 
  exports: [TypeOrmModule],
  providers: [PostResolver, PostService],
  imports: [TypeOrmModule.forFeature([Post])]})
export class PostModule { }
