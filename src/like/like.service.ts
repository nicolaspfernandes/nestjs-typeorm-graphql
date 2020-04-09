import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Like } from './like.entity'
import { LikeInput } from './models/like.input'
import { LikeOutput } from './models/like.output'

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like) private readonly likeRepository: Repository<Like>
  ) { }

  countLikesByPost(postId: string): Promise<Number> {
    return this.likeRepository.count({ where: { postId } })
  }

  likePostForUser({ postId, userId }: LikeInput): Promise<LikeOutput> {
    return this.likeRepository.save({ postId, userId })
  }

  unlinkePostForUser({ postId, userId }: LikeInput): Promise<LikeOutput> {
    return this.likeRepository.softRemove({ postId, userId })
  }

  getlikesByPost(postId: string): Promise<LikeOutput[]> {
    return this.likeRepository.find({ where: { postId } })
  }
}
