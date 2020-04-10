import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Login } from './login.entity'
import { LoginService } from './login.service'
import { LoginResolver } from './login.resolver'
import { JwtService } from '../common/service/jwt.service'
import { CryptoService } from '../common/service/crypto.service'

@Module({
  providers: [
    LoginResolver,
    LoginService,
    JwtService,
    CryptoService,
    ConfigService
  ],
  imports: [TypeOrmModule.forFeature([Login])]
})
export class LoginModule { }
