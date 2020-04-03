import { Controller, Get, Post, Body, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, Client, ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppService } from './app.service';
import User from './users-microservice/types/user.type';
import { logger } from './main';
import { IGrpcService } from './grpc.interface';
import { Observable } from 'rxjs';

const microserviceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'app',
    protoPath: join(__dirname, '../src/app.proto')
  },
}
@Controller()
export class AppController implements OnModuleInit {
  @Client(microserviceOptions as ClientOptions)
  private client: ClientGrpc;

  private grpcService: IGrpcService;

  constructor() {}

  onModuleInit() {
    this.grpcService = this.client.getService('UsersController');
  }

  @Get('users')
  getUsers(): Observable<User[]> {
    return this.grpcService.getUsers({});
  }

  @Post('users')
  addUser(@Body() userData: User): Promise<User> {
    return this.grpcService.addUser(userData).toPromise();
  }
}
