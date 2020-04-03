import { Injectable } from '@nestjs/common';
import { ClientProxyFactory, ClientOptions, Transport, ClientProxy } from '@nestjs/microservices';
import User from './users-microservice/types/user.type';
import { logger } from './main';

@Injectable()
export class AppService {
  private client: ClientProxy;
  constructor() {
    const clientOptions: ClientOptions = {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 8877,
      },
    }
    this.client = ClientProxyFactory.create(clientOptions);
  }

  addUser(userData: User) {
    return this.client
      .send<User, User>("add", userData);
  }

  getUsers() {
    logger.log("i'm in app sesrvice");
    return this.client
      .send<User[], {}>("get", {});
  }
}
