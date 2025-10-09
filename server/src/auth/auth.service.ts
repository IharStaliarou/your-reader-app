import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { UserService } from '@user/user.service';
import { LoginDto } from './dto/login.dto';
import { compareSync } from 'bcrypt';
import { User } from '@prisma/client';
import { TokenService } from '@token/token.service';
import { ITokens } from '@token/interfaces/interfaces';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly prismaService: PrismaService,
  ) {}
  signup(signupDto: SignUpDto): Promise<User> {
    const createUserDto = signupDto;
    delete createUserDto.repeatPassword;
    const createdUser = this.userService.create(createUserDto);
    return createdUser;
  }

  async login(loginDto: LoginDto): Promise<ITokens> {
    const { userName, password } = loginDto;
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

    const isPasswordMatch = compareSync(password, user?.password);

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
