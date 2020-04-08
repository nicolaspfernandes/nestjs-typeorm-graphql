import { ObjectType, Field, ID } from '@nestjs/graphql'

import { UserOutput } from '../../user/models/user.output'

@ObjectType()
export class PostOutput {
  @Field(type => ID)
  id: string

  @Field({ nullable: true })
  title?: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  updatedAt?: Date

  @Field(type => [UserOutput], { nullable: 'itemsAndList' })
  usersWhoLiked?: UserOutput[]
}
