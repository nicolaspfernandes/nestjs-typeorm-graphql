import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class LikeInput {
  @Field()
  postId: string

  @Field()
  userId: string
}
