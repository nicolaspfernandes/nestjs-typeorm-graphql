import { isObject } from 'lodash'
import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Login } from './login.entity'
import { LoginInput } from './models/login.input'
import { JwtService } from '../common/service/jwt.service'
import { CryptoService } from '../common/service/crypto.service'
import {
  InvalidCredentialsException
} from '../common/exception/invalid.credentials.exception'

import { CreateLoginInput } from './models/create.login.input'

@Injectable()
export class LoginService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly cryptoService: CryptoService,
    @InjectRepository(Login) private readonly loginRepository: Repository<Login>
  ) { }

  async createLoginForUser(
    { username, password, userId }: CreateLoginInput
  ): Promise<string> {
    const passwordSalt = this.cryptoService.generateRandomString()
    const hashedPassword = this.cryptoService.hashString(password, passwordSalt)

    await this.loginRepository.save({
      userId,
      username,
      salt: passwordSalt,
      password: hashedPassword
    })

    return this.jwtService.createJwtToken({ userId, username })
  }

  async login({ username, password }: LoginInput): Promise<string> {
    const user = await this.loginRepository.findOne({ where: { username }})

    if (!isObject(user)) {
      throw new InvalidCredentialsException()
    }

    const hashedPassword = this.cryptoService.hashString(password, user?.salt!)

    if (user?.password !== hashedPassword) {
      throw new InvalidCredentialsException()
    }

    return this.jwtService.createJwtToken({
      userId: user.userId,
      username: user.username
    })
  }
}
