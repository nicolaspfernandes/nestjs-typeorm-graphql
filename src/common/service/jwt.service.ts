import { sign } from 'jsonwebtoken'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) { }

  createJwtToken(payload: string | object | Buffer): string {
    const jwtSecret = this.configService.get<string>('JWT_SECRET')

    return sign(payload, jwtSecret!, { algorithm: 'HS256' })
  }
}
