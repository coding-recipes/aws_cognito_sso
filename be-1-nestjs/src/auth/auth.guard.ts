import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request, Response } from 'express';
import { ValidateAccessTokenResult, validateAccessToken } from './util.validate-token';
import { UserIdentity, UserRequest } from './auth.types';
@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request: UserRequest = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();

    console.log('-------- GUARD --------')
    const res: ValidateAccessTokenResult = await validateAccessToken(request);
    if (res.isValid) {
      request.identity = res.identity;
      if (res.newAccessToken) {
        response.setHeader('x-access-token', res.newAccessToken);
      }
      return true;
    } else {
      console.log("ERROR AuthGuard ---> ", res.error)
      return false;
    }

  }
}