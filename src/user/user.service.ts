import { Injectable } from '@nestjs/common'
import { Repository, UpdateResult } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { User } from './user.entity'
import { UserMapper } from './user.mapper'
import { UserInput } from './models/user.input'
import { UserOutput } from './models/user.output'

@Injectable()
export class UserService {
  constructor(
    private readonly userMapper: UserMapper,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) { }

  async saveUser(userInput: UserInput): Promise<UserOutput> {
    const userEntity = this.userMapper.mapInputToEntity(userInput)
    const user = await this.userRepository.save(userEntity)

    return this.userMapper.mapEntityToOutput(user)
  }

  deleteUserById(userId: string): Promise<UpdateResult> {
    return this.userRepository.softDelete(userId)
  }

  async getAllUsers(): Promise<UserOutput[]> {
    const users = await this.userRepository.find()

    return users.map(this.userMapper.mapEntityToOutput)
  }
}
