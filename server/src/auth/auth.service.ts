import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { compareSync } from 'bcryptjs';

import { Prisma, User } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { UserService } from '@user/user.service';
import { TokenService } from '@token/token.service';
import { ITokens } from '@token/interfaces/tokens.interface';
import { SignInDto } from './dto/sign-in.dto';
import { VerificationTokenService } from './verification-token.service';
import { SignUpUserDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly prismaService: PrismaService,
    private readonly verificationTokenService: VerificationTokenService,
  ) {}

  async signUp(
    signUpDto: SignUpUserDto,
  ): Promise<{ user: User; token: string }> {
    const { repeatPassword, password, ...userData } = signUpDto;
    const createdUser = await this.userService.create({
      ...userData,
      password: password,
      isVerified: false,
    } as Prisma.UserCreateInput);

    const verificationToken =
      this.verificationTokenService.generateVerificationToken(createdUser);
    return { user: createdUser, token: verificationToken };
  }

  async signIn(signInDto: SignInDto): Promise<ITokens> {
    const { userName, password } = signInDto;
    const user: User = await this.userService
      .findByUsername(userName)
      .catch((error) => {
        this.logger.error(error);
        return null;
      });

    if (!user) {
      const errorMessage = 'User not found';
      this.logger.error(errorMessage);
      throw new UnauthorizedException(errorMessage);
    }

    const isPasswordMatch = compareSync(password, user?.password.trim());

    if (!isPasswordMatch) {
      const errorMessage = 'Incorrect password. Please try again.';
      this.logger.error(errorMessage);
      throw new UnauthorizedException(errorMessage);
    }

    return this.tokenService.generateTokens(user);
  }

  async deleteRefreshToken(refreshToken: string) {
    await this.prismaService.token.delete({
      where: { token: refreshToken },
    });
  }
}
