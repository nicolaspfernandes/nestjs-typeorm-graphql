import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm'

import { User } from '../user/user.entity'
import { ParanoidEntity } from '../common/entity/paranoid.entity'

@Entity({ name: 'login' })
export class Login extends ParanoidEntity {
  @PrimaryColumn({ name: 'user_id', type: 'uuid' })
  userId: string

  @Column({ length: 30 })
  username: string

  @Column('text')
  password: string

  @Column('text')
  salt: string

  @JoinColumn({ name: 'user_id' })
  @OneToOne(type => User, { nullable: true })
  user?: User
}
