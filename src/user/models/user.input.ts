import { Field, InputType, ID } from '@nestjs/graphql'

import { PostInput } from '../../post/models/post.input'
import { LoginInput } from '../../login/models/login.input'

@InputType()
export class UserInput {
  @Field(type => ID, { nullable: true })
  id?: string

  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field(type => LoginInput, { nullable: true })
  login?: LoginInput

  @Field(type => [PostInput], { nullable: 'itemsAndList' })
  posts?: [PostInput]
}
