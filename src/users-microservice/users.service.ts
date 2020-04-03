import { Injectable } from '@nestjs/common';
import User from '../interfaces/user.type';
import { logger } from 'src/main';

@Injectable()
export class UsersService {
  private _users: User[] = [
    {
      username: 'string',
      password: 'string',
      email: 'string',
      birthDate: new Date(),
      cityName: 'string',
    },
  ];

  async getUsers(): Promise<{ users: User[] }> {
    return await new Promise<{ users: User[] }>((res, rej) => {
      setTimeout(() => {
        Math.random() > 0.2 ? res({
          users: this._users,
        }) : rej(new Error('Errored'));
      }, 100);
    });
  }

  async addUser(user: User): Promise<User> {
    const addedUser = await new Promise<User>((res, rej) => {
      setTimeout(() => {
        this._users.push(user)
        res(user)
      }, 100)
    })
    return addedUser;
  }
}
