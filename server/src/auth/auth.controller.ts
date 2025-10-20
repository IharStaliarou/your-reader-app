import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';

import { AuthService } from './auth.service';
import { SignUpUserDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { Public } from './guards/jwt.auth.guard';
import { TokenService } from '@token/token.service';
import { Cookies } from '@decorators/cookies.decorator';
import { getCookieOptions } from '@utils/cookie-options.util';
import { VerificationTokenService } from './verification-token.service';
import { VerificationDto } from './dto/verification.dto';
import { UserService } from '@user/user.service';

@Public()
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
    private readonly verificationTokenService: VerificationTokenService,
    private readonly userService: UserService,
  ) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpUserDto) {
    const createdUser = await this.authService.signUp(signUpDto);

    if (!createdUser) {
      const errorMessage = 'Error creating user';
      this.logger.error(errorMessage);
      throw new BadRequestException(errorMessage);
    }

    return createdUser;
  }

  @Post('signin')
  async signIn(@Body() signInDto: SignInDto, @Res() res: Response) {
    const tokens = await this.authService.signIn(signInDto);

    if (!tokens) {
      const errorMessage = 'Error signing in';
      this.logger.error(errorMessage);
      throw new BadRequestException(errorMessage);
    }

    this.tokenService.setRefreshTokenCookie(tokens, res);
    return res.status(HttpStatus.OK).json({ accessToken: tokens.accessToken });
  }

  @Get('signout')
  async signOut(
    @Cookies('refresh_token') refreshToken: string,
    @Res() res: Response,
  ) {
    const refreshTokenName =
      this.configService.get('REFRESH_TOKEN_NAME') || 'refresh_token';

    if (!refreshToken) {
      res.cookie(refreshTokenName, '', getCookieOptions(new Date(0)));
      res.sendStatus(HttpStatus.OK);
      return;
    }

    await this.authService.deleteRefreshToken(refreshToken);

    res.cookie(refreshTokenName, '', getCookieOptions(new Date(0)));

    res.sendStatus(HttpStatus.OK);
    return;
  }

  @Post('verify')
  @Public()
  async verifyEmail(@Body() verificationDto: VerificationDto) {
    try {
      const payload = this.verificationTokenService.verifyVerificationToken(
        verificationDto.token,
      );

      const verifiedUser = await this.userService.updateVerificationStatus(
        payload.userId,
        true,
      );

      return {
        message: 'Email is successfully verified',
        email: verifiedUser.email,
      };
    } catch (error) {
      throw new UnauthorizedException(
        error.message || 'Verification token is invalid. Please try again.',
      );
    }
  }
}
