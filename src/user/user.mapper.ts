import { Injectable } from '@nestjs/common'

import { User } from './user.entity'
import { UserInput } from './models/user.input'
import { UserOutput } from './models/user.output'

@Injectable()
export class UserMapper {
  mapInputToEntity(userInput: UserInput): User {
    return {
      id: userInput.id,
      lastName: userInput.lastName,
      firstName: userInput.firstName
    } as User
  }

  mapEntityToOutput(user: User): UserOutput {
    return {
      id: user.id,
      lastName: user.lastName,
      firstName: user.firstName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    } as UserOutput
  }
}
