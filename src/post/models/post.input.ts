import { Field, InputType, ID } from '@nestjs/graphql'

@InputType()
export class PostInput {
  @Field(type => ID, { nullable: true })
  id?: string

  @Field()
  title: string

  @Field()
  description: string
}
