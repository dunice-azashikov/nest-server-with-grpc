import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import User from './types/user.type';
import { MessagePattern, GrpcMethod } from '@nestjs/microservices';
import { logger } from 'src/main';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod('UsersController', 'GetUsers')
  async getUsers(): Promise<{ users: User[] }> {
    return await this.usersService.getUsers();
  }

  @GrpcMethod('UsersController', 'AddUser')
  addUsers(userData: User): Promise<User> {
    return this.usersService.addUser(userData);
  }
}
