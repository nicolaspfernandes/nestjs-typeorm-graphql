import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class LikeOutput {
  @Field()
  postId: string

  @Field()
  userId: string

  @Field({ nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  updatedAt?: Date
}
