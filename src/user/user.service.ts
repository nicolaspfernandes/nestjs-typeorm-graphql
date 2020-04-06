import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { User } from './models/user.model'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  saveUser(user: User) : Promise<User> {
    return this.userRepository.save(user)
  }

  async deleteUserById(userId: string) : Promise<Boolean> {
    const { affected } = await this.userRepository.softDelete(userId)

    return affected! > 0
  }

  getAllUsers() : Promise<User[]> {
    return this.userRepository.find()
  }  
}
