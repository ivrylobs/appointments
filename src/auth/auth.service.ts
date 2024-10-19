import { Injectable } from '@nestjs/common';
import { JwtPayloadType } from './strategies/types/jwt-payload.type';

@Injectable()
export class AuthService {
  constructor() {}

  me(userJwtPayload: JwtPayloadType): JwtPayloadType {
    return userJwtPayload;
  }
}
