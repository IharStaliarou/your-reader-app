import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from './guards/jwt.auth.guard';
import type { Response } from 'express';
import { TokenService } from '@token/token.service';
import { Cookies } from '@decorators/cookies.decorator';
import { getCookieOptions } from 'src/utils/cookie-options.util';
import { ConfigService } from '@nestjs/config';

const { REFRESH_TOKEN } = process.env;

@Public()
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {}

  @Post('signup')
  async signup(@Body() signupDto: SignUpDto) {
    const createdUser = await this.authService.signup(signupDto);

    if (!createdUser) {
      const errorMessage = 'Error creating user';
      this.logger.error(errorMessage);
      throw new BadRequestException(errorMessage);
    }

    return createdUser;
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const tokens = await this.authService.login(loginDto);

    if (!tokens) {
      const errorMessage = 'Error logging in';
      this.logger.error(errorMessage);
      throw new BadRequestException(errorMessage);
    }

    this.tokenService.setRefreshTokenCookie(tokens, res);
  }

  @Get('logout')
  async logout(
    @Cookies(REFRESH_TOKEN) refreshToken: string,
    @Res() res: Response,
  ) {
    if (!refreshToken) {
      res.sendStatus(HttpStatus.OK);
      return;
    }

    this.authService.deleteRefreshToken(refreshToken);

    const refreshTokenName = this.configService.get('REFRESH_TOKEN');
    const today = new Date();

    res.cookie(refreshTokenName, '', getCookieOptions(today));
    res.sendStatus(HttpStatus.OK);
  }
}
