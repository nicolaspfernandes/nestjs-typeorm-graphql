import crypto from 'crypto'

import { Injectable } from '@nestjs/common'

@Injectable()
export class CryptoService {
  generateRandomString(stringLength: number = 32) {
    return crypto
      .randomBytes(Math.ceil(stringLength / 2))
      .toString('hex')
      .slice(0, stringLength)
  }

  hashString(
    stringValue: string,
    saltValue: string,
    algorithm: string = 'sha512'
  ): string {
    const hashValue = crypto.createHmac(algorithm, saltValue)

    hashValue.update(stringValue)
    return hashValue.digest('hex')
  }
}
