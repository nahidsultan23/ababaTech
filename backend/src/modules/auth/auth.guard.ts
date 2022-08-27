import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (!token) throw new HttpException('User is not authenticated', 401);

    try {
      const key = fs.readFileSync('keys/jwtKey.pem', 'utf8');
      const decoded = jwt.verify(token.split(' ').pop(), key);
      request.user = decoded;
      return true;
    } catch (error) {
      return false;
    }
  }
}
