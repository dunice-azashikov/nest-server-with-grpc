import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import User from '../interfaces/user.type';
import { GrpcMethod } from '@nestjs/microservices';
import { Tracer } from 'src/tracer/Tracer';
import { FORMAT_TEXT_MAP, Tags } from 'jaeger-client/node_modules/opentracing';

@Controller()
export class UsersController {
  private tracer: Tracer = new Tracer('UsersController');

  constructor(
    private readonly usersService: UsersService,
  ) {}

  @GrpcMethod('UsersController', 'GetUsers')
  async getUsers(msg: any): Promise<{ users: User[] }> {
    const client = this.tracer.client;
    const childOf = client.extract(FORMAT_TEXT_MAP, msg.carrier);
    if (childOf) {
      const span = client.startSpan('UsersController getUsers', { childOf });
      try {
        const result = await this.usersService.getUsers();
        span.finish();
        return result;
      } catch (error) {
        span.setTag(Tags.ERROR, true);
        span.log({
          'error.message': error.message,
          'error.stack': error.stack,
        });
        span.finish();
        return { users: [] };
      }
    }
    return this.usersService.getUsers();
  }

  @GrpcMethod('UsersController', 'AddUser')
  addUsers(userData: User): Promise<User> {
    return this.usersService.addUser(userData);
  }
}
