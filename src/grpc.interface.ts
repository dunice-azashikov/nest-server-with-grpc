import { Observable } from 'rxjs';
import User from './users-microservice/types/user.type';

export interface IGrpcService {
    getUsers(data: {}): Observable<User[]>;
    addUser(user: User): Observable<User>;
}