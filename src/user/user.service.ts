import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, UpdateResult, In } from 'typeorm'

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

  private mapEntitiesToOutput(userEntities: User[]): UserOutput[] {
    return userEntities.map(this.userMapper.mapEntityToOutput)
  }

  async getUsersByIds(userIds: string[] = []): Promise<UserOutput[]> {
    const users = await this.userRepository.find({ where: { id: In(userIds) } })

    return this.mapEntitiesToOutput(users)
  }

  async getAllUsers(): Promise<UserOutput[]> {
    const users = await this.userRepository.find()

    return this.mapEntitiesToOutput(users)
  }
}
