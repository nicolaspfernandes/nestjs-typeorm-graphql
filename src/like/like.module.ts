import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Like } from '../like/like.entity'
import { LikeResolver } from './like.resolver'
import { LikeService } from '../like/like.service'

@Module({
  providers: [LikeResolver, LikeService],
  imports: [TypeOrmModule.forFeature([Like])],
  exports: [TypeOrmModule, LikeService]
})
export class LikeModule { }
