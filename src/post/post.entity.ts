import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn
} from 'typeorm'

import { User } from '../user/user.entity'
import { Like } from '../like/like.entity'
import { ParanoidEntity } from '../helper/entities/paranoid.entity'

@Entity({ name: 'posts' })
export class Post extends ParanoidEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column()
  description: string

  @Column('uuid', { name: 'user_id' })
  userId: string

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(type => User, user => user.posts)
  user?: User

  @JoinColumn({ name: 'post_id' })
  @OneToMany(type => Like, like => like.post)
  likes?: Like[]
}
