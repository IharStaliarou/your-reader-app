import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { genSaltSync, hashSync } from 'bcryptjs';
import { User } from '@prisma/client';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = this.hashPassword(createUserDto.password);
    const userData = { ...createUserDto, password: hashedPassword };

    const existingUserByUsername = await this.findByUsername(
      createUserDto.userName,
    );
    if (existingUserByUsername) {
      const message = 'User with this username already exists';
      this.logger.error(message);
      throw new ConflictException(message);
    }

    const existingUserByEmail = await this.findByEmail(createUserDto.email);
    if (existingUserByEmail) {
      const message = 'User with this email already exists';
      this.logger.error(message);
      throw new ConflictException(message);
    }

    const existingUserByPhone = await this.findByPhone(createUserDto.phone);
    if (existingUserByPhone) {
      const message = 'User with this phone already exists';
      this.logger.error(message);
      throw new ConflictException(message);
    }

    const newUser = await this.prismaService.user
      .create({
        data: userData,
      })
      .catch((error) => {
        this.logger.error('Error in creating a new user', error);
        throw new BadRequestException('Error creating user');
      });
    delete newUser.password;

    return newUser;
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  async findById(id: string) {
    return this.prismaService.user
      .findUnique({
        where: { id },
      })
      .then((foundedUser) => {
        if (!foundedUser) return null;
        return foundedUser;
      })
      .catch((error) => {
        this.logger.error('An error when looking for a user by id', error);
        throw new NotFoundException('User with this id is not found');
      });
  }

  async findByUsername(userName: string) {
    return this.prismaService.user
      .findUnique({
        where: { userName },
      })
      .then((foundedUser) => {
        if (!foundedUser) return null;
        return foundedUser;
      })
      .catch((error) => {
        this.logger.error(
          'An error when looking for a user by username',
          error,
        );
        throw new NotFoundException('User with this username is not found');
      });
  }

  async findByEmail(email: string) {
    return this.prismaService.user
      .findUnique({
        where: { email },
      })
      .then((foundedUser) => {
        if (!foundedUser) return null;
        return foundedUser;
      })
      .catch((error) => {
        this.logger.error('An error when looking for a user by email', error);
        throw new NotFoundException('User with this email is not found');
      });
  }

  async findByPhone(phone: string) {
    return this.prismaService.user
      .findUnique({
        where: { phone },
      })
      .then((foundedUser) => {
        if (!foundedUser) return null;
        return foundedUser;
      })
      .catch((error) => {
        this.logger.error('An error when looking for a user by phone', error);
        throw new NotFoundException('User with this phone is not found');
      });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    return this.prismaService.user
      .delete({ where: { id } })
      .then((deletedUser) => {
        return { message: 'User has been deleted.', deletedUser };
      })
      .catch((error) => {
        throw new Error(`Error deleting user: ${error.message}`);
      });
  }

  async updateVerificationStatus(
    userId: string,
    isVerified: boolean,
  ): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      this.logger.error(
        `User with ID ${userId} not found during verification.`,
      );
      throw new NotFoundException('User not found.');
    }

    return this.prismaService.user.update({
      where: { id: userId },
      data: { isVerified: isVerified },
    });
  }

  private hashPassword(password: string) {
    return hashSync(password, genSaltSync(10));
  }
}
