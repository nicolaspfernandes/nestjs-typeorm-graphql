import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { User } from './user.entity'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'

@Module({
  exports: [TypeOrmModule],
  providers: [UserResolver, UserService],
  imports: [TypeOrmModule.forFeature([User])]
})
export class UserModule { }
