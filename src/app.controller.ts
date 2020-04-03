import { Controller, Get, Post, Body, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, Client, ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Span, FORMAT_TEXT_MAP } from 'opentracing';

import User from './interfaces/user.type';
import { logger } from './main';
import { IGrpcService } from './grpc.interface';
import { Tracer } from './tracer/Tracer';

export const microserviceOptions: ClientOptions = {
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
  private tracer: Tracer = new Tracer('AppController');
  private grpcService: IGrpcService;

  constructor() {}

  onModuleInit() {
    this.grpcService = this.client.getService('UsersController');
  }

  @Get('users')
  async getUsers(): Promise<User[]> {
    const client = this.tracer.client;
    let context = client.startSpan('AppController getUsers');

    const carrier = {};
    const data: any = {};
    client.inject(context, FORMAT_TEXT_MAP, carrier);
    data.carrier = carrier;
    const result = await this.grpcService.getUsers(data).toPromise();
    (context as Span).finish();

    return result;
  }

  @Post('users')
  addUser(@Body() userData: User): Promise<User> {
    return this.grpcService.addUser(userData).toPromise();
  }
}
