import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import User from './types/user.type';
import { MessagePattern } from '@nestjs/microservices';
import { logger } from 'src/main';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('get')
  getUsers(): Promise<User[]> {
    logger.log("i'm in users microsesrvice controller");
    return this.usersService.getUsers();
  }

  @MessagePattern('add')
  addUsers(userData: User): Promise<User> {
  console.log("UsersController -> constructor -> userData", userData);
    return this.usersService.addUser(userData);
  }
}
