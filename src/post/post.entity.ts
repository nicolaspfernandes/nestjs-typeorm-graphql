import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn
} from 'typeorm'

import { User } from '../user/user.entity'
import { ParanoidEntity } from '../helper/entities/paranoid.entity'

@Entity({ name: 'posts' })
export class Post extends ParanoidEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(type => User, user => user.posts, { onDelete: 'CASCADE' })
  user: User

  @Column()
  title: string

  @Column()
  description: string
}
