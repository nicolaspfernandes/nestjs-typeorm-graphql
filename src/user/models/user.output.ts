import { ObjectType, Field, ID } from '@nestjs/graphql'

import { PostOutput } from '../../post/models/post.output'

@ObjectType()
export class UserOutput {
  @Field(type => ID)
  id: string

  @Field({ nullable: true })
  firstName?: string

  @Field({ nullable: true })
  lastName?: string

  @Field({ nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  updatedAt?: Date

  @Field({ nullable: true })
  token?: string

  @Field(type => [PostOutput], { nullable: 'itemsAndList' })
  posts?: PostOutput[]
}
