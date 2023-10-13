import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { verifyToken, ClaimVerifyResult } from './util.verify-token';

const validateAccessToken = async (request: any): Promise<boolean> => {
  const token = request.headers?.authorization?.split(' ')[1];
  const accessToken = request.headers?.['x-access-token']
  const refreshToken = request.headers?.['x-refresh-token']

  // console.log({ token, accessToken, refreshToken })
  console.log(token)

  if (!token) {
    return false;
  } else {
    const res = await verifyToken(token)
    console.log("ACCESS token validity ----> ", res.isValid, res.error?.message)

    return res.isValid
  }
}

@Injectable()
export class AuthGuard implements CanActivate {

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    response.setHeader('X-Access-Token-New', 'new-token');
    return validateAccessToken(request);
  }
}