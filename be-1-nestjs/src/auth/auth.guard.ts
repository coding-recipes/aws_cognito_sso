import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request, Response } from 'express';
import { handleTokens, HandleTokensResult } from './util.handle-tokens';
import { getRequestTokens, setResponseTokens, SetResponseTokensProps } from './util.api-tokens';
import { setIdentity } from './util.identity';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();
    const requestTokens = getRequestTokens(request);

    console.log('-------- GUARD --------')
    const res: HandleTokensResult = await handleTokens(requestTokens);
    if (res.isValid) {
      setIdentity(request, res.identity!)
      setResponseTokens(response, res as SetResponseTokensProps)
      return true;
    } else {
      console.log("ERROR AuthGuard ---> ", res.error)
      return false;
    }

  }
}