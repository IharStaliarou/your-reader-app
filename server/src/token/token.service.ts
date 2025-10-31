import { Response } from 'express';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Token, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import dayjs from 'dayjs';
import { v4 } from 'uuid';

import { PrismaService } from '@prisma/prisma.service';
import { UserService } from '@user/user.service';
import { ITokens } from './interfaces/tokens.interface';
import { getCookieOptions } from '@utils/cookie-options.util';

@Injectable()
export class TokenService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}
  async refreshTokens(refreshToken: string): Promise<ITokens> {
    const token = await this.prismaService.token
      .delete({
        where: { token: refreshToken },
      })
      .catch(() => null);

    if (!token) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const today = dayjs();
    const expirationDate = dayjs(token.expires);
    const isExpired = expirationDate.isBefore(today);

    if (isExpired) {
      throw new UnauthorizedException('Refresh token expired');
    }

    const user = await this.userService.findById(token.userId);

    return this.generateTokens(user);
  }

  generateTokens = async (user: User): Promise<ITokens> => {
    const accessToken = this.jwtService.sign({
      userId: user.id,
      userName: user.userName,
      email: user.email,
    });

    const refreshToken: Token = await this.getRefreshToken(user.id);

    const tokens = {
      accessToken,
      refreshToken,
    };

    return tokens;
  };

  private getRefreshToken = async (userId: string): Promise<Token> => {
    const currentDate = dayjs();

    const expirationValue = this.configService.get('TOKEN_EXPIRATION_VALUE');
    const expirationUnit = this.configService.get('TOKEN_EXPIRATION_UNIT');

    const expirationDate = currentDate
      .add(expirationValue, expirationUnit)
      .toDate();

    return await this.prismaService.token.create({
      data: {
        token: v4(),
        expires: expirationDate,
        userId,
      },
    });
  };

  setRefreshTokenCookie(tokens: ITokens, res: Response) {
    if (!tokens) {
      throw new UnauthorizedException();
    }

    const { expires, token } = tokens.refreshToken;

    const cookieExpDate = dayjs(expires).toDate();

    const refreshToken =
      this.configService.get('REFRESH_TOKEN') || 'refresh_token';

    res.cookie(refreshToken, token, getCookieOptions(cookieExpDate));
  }
}
