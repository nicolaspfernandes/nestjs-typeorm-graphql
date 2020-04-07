import { Field, InputType, ID } from '@nestjs/graphql'

import { PostInput } from '../../post/models/post.input'

@InputType()
export class UserInput {
  @Field(type => ID, { nullable: true })
  id?: string

  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field(type => [PostInput], { nullable: 'itemsAndList' })
  posts?: [PostInput]
}
