import { Controller, Get, Res, UnauthorizedException } from '@nestjs/common';
import type { Response } from 'express';
import { ConfigService } from '@nestjs/config';

import { Public } from '@auth/guards/jwt.auth.guard';
import { Cookies } from '@decorators/cookies.decorator';
import { TokenService } from './token.service';

const { REFRESH_TOKEN } = process.env;

@Public()
@Controller('token')
export class TokenController {
  constructor(
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {}

  @Get('refresh-tokens')
  async refreshTokens(
    @Cookies(REFRESH_TOKEN) refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    const tokens = await this.tokenService.refreshTokens(refreshToken);
    if (!tokens) {
      throw new UnauthorizedException();
    }

    this.tokenService.setRefreshTokenCookie(tokens, res);

    return { accessToken: tokens.accessToken };
  }
}
