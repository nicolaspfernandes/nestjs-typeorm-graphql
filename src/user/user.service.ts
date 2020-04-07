import { Injectable } from '@nestjs/common'
import { Repository, UpdateResult } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { User } from './user.entity'
import { UserInput } from './models/user.input'
import { UserOutput } from './models/user.output'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  private mapInputToUser(userInput: UserInput): User {
    return {
      id: userInput.id,
      lastName: userInput.lastName,
      firstName: userInput.firstName
    } as User
  }

  private mapUserToOutput(user: User): UserOutput {
    return {
      id: user.id,
      lastName: user.lastName,
      firstName: user.firstName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    } as UserOutput
  }

  async saveUser(userInput: UserInput): Promise<UserOutput> {
    const user = await this.userRepository.save(this.mapInputToUser(userInput))

    return this.mapUserToOutput(user)
  }

  deleteUserById(userId: string): Promise<UpdateResult> {
    return this.userRepository.softDelete(userId)
  }

  async getAllUsers(): Promise<UserOutput[]> {
    const users = await this.userRepository.find()

    return users.map(this.mapUserToOutput)
  }
}
