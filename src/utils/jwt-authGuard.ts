import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization;
      const payload = this.jwtService.verify(token.split(' ')[1]);
      if (payload.scope.indexOf('accessToken') >= 0) {
        req.user = payload.user;
        return true;
      }
    }
    throw new Error('needs to be auth.');
  }
}
