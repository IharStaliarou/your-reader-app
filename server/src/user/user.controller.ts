import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { User } from '@prisma/client';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('find-all')
  findAll() {
    return this.userService.findAll();
  }

  @Get('find-by-id/:id')
  async findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Get('find-by-username/:userName')
  async findByUsername(@Param('userName') userName: string) {
    const user: User = await this.userService.findByUsername(userName);
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;
    return userWithoutPassword;
  }

  @Get('find-by-email/:email')
  async findByEmail(@Param('email') email: string) {
    const user: User = await this.userService.findByEmail(email);
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;
    return userWithoutPassword;
  }

  @Get('find-by-phone/:phone')
  async findByPhone(@Param('phone') phone: string) {
    const user: User = await this.userService.findByPhone(phone);
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;
    return userWithoutPassword;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
