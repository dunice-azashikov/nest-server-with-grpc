import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import User from './users-microservice/types/user.type';
import { logger } from './main';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ) {}

  @Get('users')
  getUsers(): Promise<User[]> {
    logger.log("i'm in app controller");
    return this.appService.getUsers().toPromise();
  }

  @Post('users')
  addUser(@Body() userData: User): Promise<User> {
    return this.appService.addUser(userData).toPromise();
  }
}
