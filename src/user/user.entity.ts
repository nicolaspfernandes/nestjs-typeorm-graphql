import {
  Entity,
  Column,
  OneToMany,
  JoinColumn,
  PrimaryGeneratedColumn
} from 'typeorm'

import { Post } from '../post/post.entity'
import { ParanoidEntity } from '../helper/entities/ParanoidEntity'

@Entity({ name: 'users' })
export class User extends ParanoidEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'first_name' })
  firstName: string

  @Column({ name: 'last_name' })
  lastName: string

  @JoinColumn({ name: 'user_id' })
  @OneToMany(type => Post, post => post.user)
  posts?: Post[]
}
