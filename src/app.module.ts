import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserModule } from './user/user.module'
import { PostModule } from './post/post.module'

@Module({
  imports: [
    UserModule,
    PostModule,
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot({ envFilePath: '.env' }),
    GraphQLModule.forRoot({ autoSchemaFile: 'schema.gql' })
  ],
})
export class AppModule { }
