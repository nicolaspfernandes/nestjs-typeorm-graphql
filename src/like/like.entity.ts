import { Entity, JoinColumn, PrimaryColumn, OneToMany } from 'typeorm'

import { User } from '../user/user.entity'
import { Post } from '../post/post.entity'
import { ParanoidEntity } from '../helper/entities/paranoid.entity'

@Entity({ name: 'likes' })
export class Like extends ParanoidEntity {
  @PrimaryColumn('uuid', { name: 'post_id' })
  postId: string

  @PrimaryColumn('uuid', { name: 'user_id' })
  userId: string

  @JoinColumn({ name: 'post_id' })
  @OneToMany(type => Post, post => post.likes)
  post?: Post

  @JoinColumn({ name: 'user_id' })
  @OneToMany(type => User, user => user.likes)
  user?: User
}
