import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
  SerializeOptions,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/domain/user';
import { JwtPayloadType } from './strategies/types/jwt-payload.type';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['me'],
  })
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({
    type: User,
  })
  @HttpCode(HttpStatus.OK)
  public me(@Request() request): JwtPayloadType {
    return this.service.me(request.user);
  }
}
